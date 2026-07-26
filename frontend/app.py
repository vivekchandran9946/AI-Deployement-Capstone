import streamlit as st
import requests
import plotly.graph_objects as go

# ---------------------------------
# Page Configuration
# ---------------------------------

st.set_page_config(
    page_title="ConnectTel AI Dashboard",
    page_icon="📊",
    layout="wide"
)

st.title("📊 ConnectTel AI Dashboard")
st.subheader("AI-Powered Customer Churn Prediction System")

st.markdown("---")

# ---------------------------------
# Input Layout
# ---------------------------------

left, right = st.columns(2)

with left:

    gender = st.selectbox("Gender", ["Male", "Female"])

    SeniorCitizen = st.selectbox(
        "Senior Citizen",
        [0, 1],
        format_func=lambda x: "No" if x == 0 else "Yes"
    )

    Partner = st.selectbox("Partner", ["Yes", "No"])

    Dependents = st.selectbox("Dependents", ["Yes", "No"])

    tenure = st.slider(
        "Tenure (Months)",
        min_value=0,
        max_value=72,
        value=12
    )

    MonthlyCharges = st.slider(
        "Monthly Charges",
        min_value=0.0,
        max_value=150.0,
        value=70.0
    )

    TotalCharges = st.number_input(
        "Total Charges",
        value=800.0
    )

with right:

    PhoneService = st.selectbox(
        "Phone Service",
        ["Yes", "No"]
    )

    MultipleLines = st.selectbox(
        "Multiple Lines",
        ["No", "Yes", "No phone service"]
    )

    InternetService = st.selectbox(
        "Internet Service",
        ["DSL", "Fiber optic", "No"]
    )

    OnlineSecurity = st.selectbox(
        "Online Security",
        ["Yes", "No", "No internet service"]
    )

    OnlineBackup = st.selectbox(
        "Online Backup",
        ["Yes", "No", "No internet service"]
    )

    DeviceProtection = st.selectbox(
        "Device Protection",
        ["Yes", "No", "No internet service"]
    )

    TechSupport = st.selectbox(
        "Tech Support",
        ["Yes", "No", "No internet service"]
    )

    StreamingTV = st.selectbox(
        "Streaming TV",
        ["Yes", "No", "No internet service"]
    )

    StreamingMovies = st.selectbox(
        "Streaming Movies",
        ["Yes", "No", "No internet service"]
    )

    Contract = st.selectbox(
        "Contract",
        ["Month-to-month", "One year", "Two year"]
    )

    PaperlessBilling = st.selectbox(
        "Paperless Billing",
        ["Yes", "No"]
    )

    PaymentMethod = st.selectbox(
        "Payment Method",
        [
            "Electronic check",
            "Mailed check",
            "Bank transfer (automatic)",
            "Credit card (automatic)"
        ]
    )

st.markdown("---")

# ---------------------------------
# Predict Button
# ---------------------------------

if st.button("🔍 Predict Customer Churn", use_container_width=True):

    customer = {
        "gender": gender,
        "SeniorCitizen": SeniorCitizen,
        "Partner": Partner,
        "Dependents": Dependents,
        "tenure": tenure,
        "PhoneService": PhoneService,
        "MultipleLines": MultipleLines,
        "InternetService": InternetService,
        "OnlineSecurity": OnlineSecurity,
        "OnlineBackup": OnlineBackup,
        "DeviceProtection": DeviceProtection,
        "TechSupport": TechSupport,
        "StreamingTV": StreamingTV,
        "StreamingMovies": StreamingMovies,
        "Contract": Contract,
        "PaperlessBilling": PaperlessBilling,
        "PaymentMethod": PaymentMethod,
        "MonthlyCharges": MonthlyCharges,
        "TotalCharges": TotalCharges
    }

    try:

        with st.spinner("Analyzing customer data..."):

            response = requests.post(
                "https://customer-churn-api.onrender.com/predict",
                json=customer,
                timeout=10
            )
        if response.status_code == 200:

            result = response.json()

            st.markdown("---")
            st.header("📈 Prediction Result")

            if result["prediction_code"] == 1:
                st.error("🚨 " + result["prediction"])
            else:
                st.success("✅ " + result["prediction"])

            # -----------------------------
            # Risk Level
            # -----------------------------

            churn = result["probability_churn"]

            if churn < 30:
                st.success("🟢 Risk Level : LOW")
            elif churn < 70:
                st.warning("🟡 Risk Level : MEDIUM")
            else:
                st.error("🔴 Risk Level : HIGH")

            # -----------------------------
            # Metrics
            # -----------------------------

            c1, c2 = st.columns(2)

            with c1:

                st.metric(
                    "Probability of Staying",
                    f"{result['probability_stay']}%"
                )

                st.progress(result["probability_stay"] / 100)

            with c2:

                st.metric(
                    "Probability of Churning",
                    f"{result['probability_churn']}%"
                )

                st.progress(result["probability_churn"] / 100)

            # -----------------------------
            # Plotly Doughnut Chart
            # -----------------------------

            fig = go.Figure(
                data=[
                    go.Pie(
                        labels=["Stay", "Churn"],
                        values=[
                            result["probability_stay"],
                            result["probability_churn"]
                        ],
                        hole=0.6,
                        textinfo="label+percent"
                    )
                ]
            )

            fig.update_layout(
                title="Prediction Probability",
                height=450
            )

            st.plotly_chart(
                fig,
                use_container_width=True
            )

            # -----------------------------
            # Recommendation
            # -----------------------------

            st.info("💡 Recommendation")

            st.write(result["recommendation"])

        else:

            st.error("Prediction failed!")

    except requests.exceptions.ConnectionError:

        st.error(
            "❌ Cannot connect to FastAPI.\n\nPlease make sure the backend server is running."
        )

    except Exception as e:

        st.error(f"Unexpected Error: {e}")

st.markdown("---")

st.caption(
    " ConnectTel AI Dashboard"
)