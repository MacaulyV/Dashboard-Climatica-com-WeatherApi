from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import logging
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Habilita o CORS para todas as rotas

logging.basicConfig(level=logging.DEBUG)

@app.route('/places-suggestions', methods=['GET'])
def places_suggestions():
    query = request.args.get('query')
    if not query:
        return jsonify({"error": "Query não informada"}), 400

    try:
        # Substitua YOUR_API_KEY pela sua chave da Google Places API
        url = f"https://maps.googleapis.com/maps/api/place/autocomplete/json?input={query}&key=AIzaSyA7Zm1Fy002u23LUn3BmdLcMW_2Fh8EAaQ&language=en-US"
        response = requests.get(url)
        response.raise_for_status()  # Isso lançará uma exceção se a resposta contiver um código de status de erro

        suggestions = response.json().get('predictions', [])
        formatted_suggestions = [{"description": suggestion["structured_formatting"]["main_text"]} for suggestion in suggestions]
        return jsonify(formatted_suggestions), 200
    except requests.exceptions.HTTPError as errh:
        logging.error(f"Erro HTTP: {errh}")
        return jsonify({"error": "Erro ao buscar sugestões de lugares", "details": str(errh)}), 500
    except requests.exceptions.ConnectionError as errc:
        logging.error(f"Erro de conexão: {errc}")
        return jsonify({"error": "Erro de conexão", "details": str(errc)}), 500
    except requests.exceptions.Timeout as errt:
        logging.error(f"Tempo limite da solicitação: {errt}")
        return jsonify({"error": "Tempo limite da solicitação", "details": str(errt)}), 500
    except requests.exceptions.RequestException as err:
        logging.error(f"Erro de solicitação: {err}")
        return jsonify({"error": "Erro de solicitação", "details": str(err)}), 500

# Os outros endpoints permanecem inalterados

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
        response.raise_for_status()  # Isso lançará uma exceção se a resposta contiver um código de status de erro
        
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
                "temperatura_max": data["main"]["temp_max"],  # Adicionado
                "temperatura_min": data["main"]["temp_min"],  # Adicionado
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
        # Modifique a URL da API para incluir o intervalo de tempo desejado
        url = f"http://api.openweathermap.org/data/2.5/forecast?q={cidade}&appid=1b267ca5664ea689f15c46015e55af37&units=metric"
        response = requests.get(url)
        if response.status_code!= 200:
            return jsonify({"error": "Erro ao buscar dados do clima"}), 500
        
        data = response.json()
        daily_forecast = {}
        for forecast in data['list']:
            date = datetime.strptime(forecast['dt_txt'], '%Y-%m-%d %H:%M:%S').strftime('%Y-%m-%d %H:%M')
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
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/previsao-horaria', methods=['GET'])
def previsao_horaria():
    cidade = request.args.get('cidade')
    if not cidade:
        return jsonify({"error": "Cidade não informada"}), 400
    
    try:
        # Substitua YOUR_API_KEY pela sua chave da OpenWeatherMap API
        url = f"http://api.openweathermap.org/data/2.5/forecast?q={cidade}&appid=1b267ca5664ea689f15c46015e55af37&units=metric"
        response = requests.get(url)
        response.raise_for_status()
        
        data = response.json()
        forecasts = []
        for item in data['list']:
            forecasts.append({
                'date': datetime.fromtimestamp(item['dt']).strftime('%Y-%m-%d %H:%M'),
                'temp': item['main']['temp'],
                'description': item['weather'][0]['description']
            })
        
        return jsonify(forecasts), 200
    except requests.exceptions.HTTPError as errh:
        logging.error(f"Erro HTTP: {errh}")
        return jsonify({"error": "Erro ao buscar dados climáticos", "details": str(errh)}), 500
    except requests.exceptions.ConnectionError as errc:
        logging.error(f"Erro de conexão: {errc}")
        return jsonify({"error": "Erro de conexão", "details": str(errc)}), 500
    except requests.exceptions.Timeout as errt:
        logging.error(f"Tempo limite da solicitação: {errt}")
        return jsonify({"error": "Erro de tempo limite da solicitação", "details": str(errt)}), 500
    except requests.exceptions.RequestException as err:
        logging.error(f"Erro de solicitação: {err}")
        return jsonify({"error": "Erro de solicitação", "details": str(err)}), 500    

@app.route('/map-location', methods=['POST'])
def get_map_location():
    location_name = request.json['locationName']
    if not location_name:
        return jsonify({"error": "Nome da localização não informado"}), 400
    
    try:
        url = f"https://maps.googleapis.com/maps/api/geocode/json?address={location_name}&key=AIzaSyDNYUl1UjVcOS6FJXyrQn7yh2-PIPnWDRA"
        
        response = requests.get(url)
        response.raise_for_status()  # Isso lançará uma exceção se a resposta contiver um código de status de erro
        
        result = response.json().get('results', [])[0]
        latitude = result.get('geometry', {}).get('location', {}).get('lat')
        longitude = result.get('geometry', {}).get('location', {}).get('lng')
        if latitude and longitude:
            return jsonify({"latitude": latitude, "longitude": longitude}), 200
        else:
            return jsonify({"error": "Localização não encontrada"}), 404
    except requests.exceptions.HTTPError as errh:
        logging.error(f"Erro HTTP: {errh}")
        return jsonify({"error": "Erro ao buscar localização", "details": str(errh)}), 500
    except requests.exceptions.ConnectionError as errc:
        logging.error(f"Erro de conexão: {errc}")
        return jsonify({"error": "Erro de conexão", "details": str(errc)}), 500
    except requests.exceptions.Timeout as errt:
        logging.error(f"Erro de tempo limite da solicitação: {errt}")
        return jsonify({"error": "Erro de tempo limite da solicitação", "details": str(errt)}), 500
    except requests.exceptions.RequestException as err:
        logging.error(f"Erro de solicitação: {err}")
        return jsonify({"error": "Erro de solicitação", "details": str(err)}), 500

if __name__ == '__main__':
    app.run(debug=True)
