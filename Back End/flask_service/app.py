from flask import Flask, request, jsonify
import numpy as np
import pandas as pd
import joblib
from tensorflow.keras.models import load_model
from utils.ratio import compute_ratio
import traceback

app = Flask(__name__)

# Load model dan preprocessing
model = load_model('flask_service\model\model_sakoo_ann.keras')
preprocessing = joblib.load('flask_service\model\preprocessing.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    try:
        data = request.get_json()
        print("Received data:", data)
        df = pd.DataFrame([{
            "Pendapatan Bulanan": data["Pendapatan Bulanan"],
            "Total Pengeluaran": data["Total Pengeluaran"],
            "Tabungan": data["Tabungan"],
            "Cicilan Per Bulan": data["Cicilan Per Bulan"],
            "Dana Darurat": data["Dana Darurat"],
            "Total Aset": data["Total Aset"],
            "Total Utang": data["Total Utang"],
        }])

        print("📊 DataFrame:", df)

        ratios = compute_ratio(df)
        print("📈 Ratios:", ratios)

        ratio_columns = [
            "ExpenseToIncomeRatio",
            "SavingToIncomeRatio",
            "DebtToIncomeRatio",
            "EmergencyFundRatio",
            "AssetToDebtRatio",
            "DebtToAssetRatio"
        ]

        ratios_df = pd.DataFrame(ratios, columns=ratio_columns)
        print("📊 Ratios (DataFrame):", ratios_df)

        X_user_ratio = preprocessing.transform(ratios_df)
        print("🧪 After preprocessing:", X_user_ratio)

        prediction = model.predict(X_user_ratio)
        print("🔮 Raw prediction:", prediction)

        predicted_class = int(np.argmax(prediction, axis=1)[0])
        print("✅ Predicted class:", predicted_class)

        return jsonify({
            "prediction": predicted_class,
            "probabilities": prediction.tolist()[0]
        })

    except Exception as e:
        print("❌ ERROR:", str(e))
        traceback.print_exc()  # ← ini akan print full error ke terminal
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(port=5000, debug=True)
