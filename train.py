import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.impute import SimpleImputer
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report

# -----------------------------
# Load Dataset
# -----------------------------
df = pd.read_csv("data/WA_Fn-UseC_-Telco-Customer-Churn.csv")

print("Dataset Shape:", df.shape)
print(df.head())

# -----------------------------
# Data Cleaning
# -----------------------------

# TotalCharges contains blanks
df["TotalCharges"] = pd.to_numeric(df["TotalCharges"], errors="coerce")

# Drop customerID (not useful)
df.drop("customerID", axis=1, inplace=True)

# Remove missing values
df.dropna(inplace=True)

# Convert target to binary
df["Churn"] = df["Churn"].map({"Yes": 1, "No": 0})

# -----------------------------
# Features & Target
# -----------------------------

X = df.drop("Churn", axis=1)
y = df["Churn"]

# Numerical and categorical columns
num_cols = X.select_dtypes(include=["int64", "float64"]).columns
cat_cols = X.select_dtypes(include=["object"]).columns

# -----------------------------
# Preprocessing
# -----------------------------

numeric_transformer = Pipeline([
    ("imputer", SimpleImputer(strategy="median")),
    ("scaler", StandardScaler())
])

categorical_transformer = Pipeline([
    ("imputer", SimpleImputer(strategy="most_frequent")),
    ("encoder", OneHotEncoder(handle_unknown="ignore"))
])

preprocessor = ColumnTransformer([
    ("num", numeric_transformer, num_cols),
    ("cat", categorical_transformer, cat_cols)
])

# -----------------------------
# Model Pipeline
# -----------------------------

model = Pipeline([
    ("preprocessor", preprocessor),
    ("classifier", RandomForestClassifier(
        n_estimators=200,
        random_state=42
    ))
])

# -----------------------------
# Train/Test Split
# -----------------------------

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

# -----------------------------
# Train Model
# -----------------------------

print("\nTraining model...")

model.fit(X_train, y_train)

# -----------------------------
# Evaluation
# -----------------------------

predictions = model.predict(X_test)

accuracy = accuracy_score(y_test, predictions)

print("\nAccuracy:", round(accuracy * 100, 2), "%")

print("\nClassification Report:\n")
print(classification_report(y_test, predictions))

# -----------------------------
# Save Model
# -----------------------------

joblib.dump(model, "model/churn_model.pkl")

print("\nModel saved successfully!")