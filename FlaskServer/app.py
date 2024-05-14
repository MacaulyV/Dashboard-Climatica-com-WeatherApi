from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import logging
from datetime import datetime

app = Flask(__name__)
CORS(app) # Habilita o CORS para todas as rotas

logging.basicConfig(level=logging.DEBUG)

# Endpoint de Geolocalização
@app.route('/geolocalizacao', methods=['GET'])
def geolocalizacao():
    lat = request.args.get('lat')
    lon = request.args.get('lon')
    
    if not lat or not lon:
        return jsonify({"error": "Latitude ou Longitude não informadas"}), 400
    
    try:
        url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=1ec37df65fb7864a9a9540725fde8b6a"
        logging.debug(f"URL da API: {url}")
        
        response = requests.get(url)
        response.raise_for_status() # Isso lançará uma exceção se a resposta contiver um código de status de erro
        
        data = response.json()
        logging.debug(f"Resposta da API: {response.text}")
        
        if "weather" in data and data["weather"]:
            clima_data = {
                "temperatura_atual": data["main"]["temp"],
                "umidade": data["main"]["humidity"],
                "velocidade_vento": data["wind"]["speed"],
                "sensacao_termica": data["main"]["feels_like"],
                "descricao_clima": data["weather"][0]["description"],
                "precipitacao": data["rain"]["1h"] if "rain" in data and "1h" in data["rain"] else 0,
                "temperatura_max": data["main"]["temp_max"], # Adicionado
                "temperatura_min": data["main"]["temp_min"], # Adicionado
            }
            return jsonify(clima_data), 200
        else:
            return jsonify({"error": "Dados de clima não encontrados"}), 404
    except requests.exceptions.HTTPError as errh:
        return jsonify({"error": "Erro HTTP", "details": str(errh)}), 500
    except requests.exceptions.ConnectionError as errc:
        return jsonify({"error": "Erro de conexão", "details": str(errc)}), 500
    except requests.exceptions.Timeout as errt:
        return jsonify({"error": "Tempo limite da solicitação", "details": str(errt)}), 500
    except requests.exceptions.RequestException as err:
        return jsonify({"error": "Erro de solicitação", "details": str(err)}), 500

@app.route('/clima', methods=['GET'])
def clima():
    cidade = request.args.get('cidade')
    if not cidade:
        return jsonify({"error": "Cidade não informada"}), 400
    
    try:

        url = f"http://api.openweathermap.org/data/2.5/forecast?q={cidade}&appid=YOUR_API_KEY"

        url = f"http://api.openweathermap.org/data/2.5/weather?q={cidade}&appid="

        response = requests.get(url)
        if response.status_code == 200:
            data = response.json()
            daily_forecast = {}

            for forecast in data['list']:
                date = datetime.strptime(forecast['dt_txt'], '%Y-%m-%d %H:%M:%S').strftime('%Y-%m-%d')
                if date not in daily_forecast:
                    daily_forecast[date] = {
                        'max_temp': forecast['main']['temp_max'],
                        'min_temp': forecast['main']['temp_min'],
                        'description': forecast['weather'][0]['description'],
                    }
                else:
                    daily_forecast[date]['max_temp'] = max(daily_forecast[date]['max_temp'], forecast['main']['temp_max'])
                    daily_forecast[date]['min_temp'] = min(daily_forecast[date]['min_temp'], forecast['main']['temp_min'])

            daily_forecast_list = [{'date': date, **data} for date, data in sorted(daily_forecast.items())]
            return jsonify(daily_forecast_list), 200
        else:
            return jsonify({"error": "Erro ao buscar dados do clima"}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
