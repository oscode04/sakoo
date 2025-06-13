import numpy as np

def compute_ratio(col):
    # Jika input bukan data mentah (7 kolom), lewati transformasi
    if col.shape[1] < 7:
        return col

    epsilon = 1e-6
    pendapatan_bulanan = col.iloc[:, 0]
    total_pengeluaran = col.iloc[:, 1]
    tabungan = col.iloc[:, 2]
    cicilan_perbulan = col.iloc[:, 3]
    dana_darurat = col.iloc[:, 4]
    total_aset = col.iloc[:, 5]
    total_utang = col.iloc[:, 6]

    ExpenseToIncomeRatio = total_pengeluaran / (pendapatan_bulanan + epsilon)
    SavingToIncomeRatio = tabungan / (pendapatan_bulanan + epsilon)
    DebtToIncomeRatio = cicilan_perbulan / (pendapatan_bulanan + epsilon)
    EmergencyFundRatio = dana_darurat / (total_pengeluaran + epsilon)
    AssetToDebtRatio = total_aset / (total_utang + epsilon)
    DebtToAssetRatio = total_utang / (total_aset + epsilon)

    return np.stack([
        ExpenseToIncomeRatio,
        SavingToIncomeRatio,
        DebtToIncomeRatio,
        EmergencyFundRatio,
        AssetToDebtRatio,
        DebtToAssetRatio
    ], axis=1)
