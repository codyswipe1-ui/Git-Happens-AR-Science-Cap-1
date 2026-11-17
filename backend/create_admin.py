from getpass import getpass

from sqlalchemy import or_

from database import SessionLocal
from models.user import User
from auth.security import hash_password


def create_admin():
    print("\n=== ImmerseED Admin Setup ===")

    username = input("Admin username: ").strip()
    email = input("Admin email: ").strip().lower()

    if not username or not email:
        print("Username and email cannot be empty.")
        return

    password = getpass("Admin password: ")
    confirm_password = getpass("Confirm password: ")

    if password != confirm_password:
        print("Passwords do not match.")
        return

    if len(password) < 12:
        print("Password must be at least 12 characters.")
        return

    db = SessionLocal()

    try:
        existing_user = db.query(User).filter(
            or_(
                User.username == username,
                User.email == email
            )
        ).first()

        if existing_user:
            print("A user with that username or email already exists.")
            return

        admin = User(
            username=username,
            email=email,
            hashed_password=hash_password(password),
            role="admin"
        )

        db.add(admin)
        db.commit()

        print("Admin account created successfully!")

    except Exception:
        db.rollback()
        print("Could not create admin account.")
        raise

    finally:
        db.close()


if __name__ == "__main__":
    create_admin()
