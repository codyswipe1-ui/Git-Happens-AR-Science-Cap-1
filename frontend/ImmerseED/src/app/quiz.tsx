import { useEffect, useState } from 'react';
import { Button, Platform, ScrollView, Text, View } from 'react-native';

const QUIZ_URL = 'http://127.0.0.1:8000/quizzes/animal-cell';

type Quiz = {
  id: string;
  title: string;
  questions: {
    id: number;
    question: string;
    choices: Record<string, string>;
  }[];
};

type QuizResult = {
  score: number;
  total: number;
  percentage: number;
  results: {
    question_id: number;
    selected_answer: string;
    correct_answer: string;
    is_correct: boolean;
    explanation: string;
  }[];
};

export default function QuizScreen() {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState<QuizResult | null>(null);
  const [loadError, setLoadError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function loadQuiz() {
      try {
        const response = await fetch(QUIZ_URL);

        if (!response.ok) {
          throw new Error(`Quiz request failed (HTTP ${response.status}).`);
        }

        const data: Quiz = await response.json();
        setQuiz(data);
      } catch (error) {
        setLoadError(error instanceof Error ? error.message : 'Could not load quiz.');
      }
    }

    void loadQuiz();
  }, []);

  const allAnswered = quiz?.questions.every(({ id }) => Boolean(answers[id])) ?? false;

  async function submitQuiz() {
    if (!allAnswered || submitting || result) return;

    setSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch(`${QUIZ_URL}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers }),
      });

      if (!response.ok) {
        throw new Error(`Submission failed (HTTP ${response.status}).`);
      }

      const data: QuizResult = await response.json();
      setResult(data);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Could not submit quiz.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 24,
        paddingTop: Platform.OS === 'web' ? 88 : 24,
        gap: 16,
        backgroundColor: 'white',
      }}>
      {loadError ? <Text>{loadError}</Text> : null}
      {!quiz && !loadError ? <Text>Loading quiz…</Text> : null}

      {quiz && (
        <>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{quiz.title}</Text>

          {result && (
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
              Score: {result.score}/{result.total} ({result.percentage}%)
            </Text>
          )}

          {quiz.questions.map((question, index) => {
            const feedback = result?.results.find(
              (item) => item.question_id === question.id
            );

            return (
              <View key={question.id} style={{ gap: 6 }}>
                <Text style={{ fontWeight: 'bold' }}>
                  {index + 1}. {question.question}
                </Text>

                {Object.entries(question.choices).map(([letter, label]) => (
                  <Button
                    key={letter}
                    title={`${answers[question.id] === letter ? 'Selected: ' : ''}${letter}. ${label}`}
                    disabled={submitting || result !== null}
                    onPress={() =>
                      setAnswers((previous) => ({
                        ...previous,
                        [question.id]: letter,
                      }))
                    }
                  />
                ))}

                {feedback && (
                  <Text>
                    {feedback.is_correct ? 'Correct.' : 'Incorrect.'}{' '}
                    Correct answer: {feedback.correct_answer}.{' '}
                    {question.choices[feedback.correct_answer]}
                    {'\n'}
                    {feedback.explanation}
                  </Text>
                )}
              </View>
            );
          })}

          {submitError ? <Text>{submitError}</Text> : null}

          {!result && (
            <Button
              title={submitting ? 'Submitting…' : 'Submit quiz'}
              disabled={!allAnswered || submitting}
              onPress={() => void submitQuiz()}
            />
          )}
        </>
      )}
    </ScrollView>
  );
}