import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import os

def parse_pdf(filepath):
    print("parse_pdf() called with:", filepath)

    # Mock data
    categories = {
        "Groceries": 800,
        "Utilities": 600,
        "Entertainment": 400,
        "Other": 1400
    }

    labels = list(categories.keys())
    values = list(categories.values())

    try:
        
        output_dir = os.path.join(os.getcwd(), 'static')
        if not os.path.exists(output_dir):
            os.makedirs(output_dir)
            print("Created directory:", output_dir)

        plt.figure(figsize=(6, 6))
        plt.pie(values, labels=labels, autopct='%1.1f%%', startangle=140)
        plt.title('Expense Distribution')

        output_path = os.path.join(output_dir, 'pie_chart.png')
        print("Saving chart to:", output_path)

        plt.savefig(output_path)
        plt.close()
        print(" Chart saved successfully.")

        return {
            "chart_url": "/static/pie_chart.png"
        }

    except Exception as e:
        print("Error:", e)
        raise
