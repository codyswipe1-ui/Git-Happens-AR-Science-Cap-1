import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from "expo-router";

//Welcome Screen (Before Login Screen)
export default function WelcomeScreen(){
  return(
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}>

        {/*logo/tagline*/}
        <View style={styles.header}>
          <Text style={styles.logo}>
            Immerse <Text style={styles.logoED}>ED</Text>
          </Text>

          <Text style ={styles.tagline}>Science you can step inside · Grade 4-8</Text>
        </View>

        {/*Screen preview*/}
        {/*NEED TO ADD SLIDESHOW FEATURE */}
        <View style={styles.quizContainer}>

          <View style={styles.scoreCircle}>
            <Text style={styles.score}>3/3</Text>
            <Text style={styles.passed}>passed!</Text>
          </View>

          
          <Text style={styles.questionNumber}>
            Question 1 of 3
          </Text>

          <Text style={styles.question}>
            Which part holds the cell's DNA? 
          </Text>

          <View style={styles.correctAnswer}>
            <Text style={styles.answerText}>Nucleus</Text>
              <Text style={styles.check}>🗸</Text>
          </View>
        </View>
      

        {/*Bottom Section*/}
        <View style={styles.bottomSection}>
          {/*Page indicator */}
          <View style={styles.indicator}>
            <View style={styles.dot} />
              <View style={styles.dot} />
                <View style={styles.activeDot} />
          </View>

          <Text style={styles.heading}>
            Prove your skills!
          </Text>

          <Text style={styles.description}>
            Quick Quizzes: show what you know to unlock the next lesson!
          </Text>

          {/* Guest access (no account) */}
          <TouchableOpacity style={styles.startButton}
            onPress={() => router.replace("/explore")}>
              <Text style={styles.startButtonText}>
                Let's Get Started!
              </Text>
            </TouchableOpacity>

            {/* Optional Account Login */}
            <TouchableOpacity>
            {/* ("/login") TO BE ADDED IN ROUTER.PUSH*/}
              {/*onPress={() => router.push()}*/}
                <Text style={styles.loginText}>
                  I have an account - Log in
                </Text>
              </TouchableOpacity>

        </View>

      </ScrollView>
    </View>
  );
}



//Style Sheet
const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "#FFD1B9",
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: "space-between",
  },

  header: {
    alignItems: "center",
    paddingTop: 65,
    paddingHorizontal: 20,
  },

  logo: {
    fontSize: 29,
    fontWeight: "bold",
    color: "#171519",
  },

  logoED: {
    backgroundColor: "#171519",
    color: "#ffffff",
    overflow: "hidden",
    borderRadius: 8,
  },

  tagline: {
    fontSize: 15,
    fontWeight: "600",
    color: "#343139",
    marginTop: 12,
    textAlign: "center", 
  },

  quizContainer: {
    backgroundColor: "#ffffff",
    marginHorizontal: 28,
    marginTop: 75,
    marginBottom: 65,
    padding: 28,
    borderRadius: 25,
    minHeight: 300,
    justifyContent: "center",
    gap: 15,
    elevation: 5,

    shadowColor: "#000",
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },

  scoreCircle: {
    position: "absolute",
    top: -30,
    right: -12,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#171519",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },

  score: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "bold",
  },

  passed: {
    color: "#ffffff",
    fontSize: 13,
  },

  questionNumber: {
    color: "#777680",
    fontSize: 15,
    fontWeight: "600",
  },

  question: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#171519",
    marginTop: 5,
  },

  answer: {
    backgroundColor: "#F1F1F5",
    padding: 17,
    borderRadius: 17,
  },

  correctAnswer: {
    backgroundColor: "#B9EBD5",
    borderWidth: 2,
    borderColor: "#171519",
    padding: 17,
    borderRadius: 17,
    flexDirection:  "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  answerText: {
  fontSize: 17,
  fontWeight: "600",
  color: "#171519",
  },

  check: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#171519",
    marginLeft: 8,
  },

  bottomSection: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingHorizontal: 28,
    paddingTop: 35,
    paddingBottom: 35,
    alignItems: "center",
  },

  indicator: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
    marginBottom: 30,
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#DADAE2",
  },

  activeDot: {
    width: 38,
    height: 10,
    borderRadius: 8,
    backgroundColor: "#171519",
  },

  heading: {
    fontSize: 27,
    fontWeight: "bold",
    color: "#171519",
    marginBottom: 15,
    textAlign: "center",
  },

  description: {
    fontSize: 17,
    color: "#666570",
    textAlign: "center",
    lineHeight: 25,
    marginBottom: 28,
  },

  startButton: {
    width: "100%",
    backgroundColor: "#171519",
    padding: 19,
    borderRadius: 18,
    alignItems: "center",
  },

  startButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },

  loginText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#171519",
    textDecorationLine: "underline",
    marginTop: 25,
  },
});