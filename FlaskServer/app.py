from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app) # Habilita o CORS para todas as rotas

@app.route('/clima', methods=['GET'])
def clima():
    cidade = request.args.get('cidade')
    if not cidade:
        return jsonify({"error": "Cidade não informada"}), 400

    try:
        url = f"http://api.openweathermap.org/data/2.5/weather?q={cidade}&appid="
        response = requests.get(url)
        if response.status_code == 200:
            data = response.json()
            clima_data = {
                "descricao_clima": data["weather"][0]["description"],
                "temperatura_atual": data["main"]["temp"],
                "temperatura_minima": data["main"]["temp_min"],
                "temperatura_maxima": data["main"]["temp_max"],
                "umidade": data["main"]["humidity"],
                "velocidade_vento": data["wind"]["speed"],
                "sensacao_termica": data["main"]["feels_like"],
            }
            return jsonify(clima_data), 200
        else:
            return jsonify({"error": "Erro ao buscar dados do clima"}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
