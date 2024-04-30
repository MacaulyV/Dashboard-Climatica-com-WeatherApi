from flask import Flask, jsonify, request
from flask_cors import CORS
import cx_Oracle

app = Flask(__name__)
CORS(app)  # Configuração do CORS

# Configurações do banco de dados Oracle
username = 'rm553350'
password = '191203'
host = 'oracle.fiap.com.br'
port = 1521
service_name = 'orcl'

# Rota para registrar usuário
@app.route('/registrar', methods=['POST'])
def registrar_usuario():
    # Obter os dados enviados no corpo da requisição
    dados = request.json
    
    # Extrair os dados do usuário do corpo da requisição
    nome_usuario = dados.get('nome_usuario')
    senha = dados.get('senha')
    cidade_preferencia = dados.get('cidade_preferencia')
    receber_notificacoes = dados.get('receber_notificacoes')
    
    # Conectar ao banco de dados Oracle
    try:
        conn = cx_Oracle.connect(
            username=username,
            password=password,
            dsn=f'{host}:{port}/{service_name}',
            encoding='UTF-8'
        )
        
        # Cria um cursor para executar comandos SQL
        cursor = conn.cursor()
        
        # Executa uma instrução INSERT para adicionar o novo usuário ao banco de dados
        cursor.execute("""
            INSERT INTO usuarios (nome_usuario, senha, cidade_preferencia, receber_notificacoes)
            VALUES (:nome_usuario, :senha, :cidade_preferencia, :receber_notificacoes)
        """, {
            'nome_usuario': nome_usuario,
            'senha': senha,
            'cidade_preferencia': cidade_preferencia,
            'receber_notificacoes': receber_notificacoes
        })
        
        # Confirma a transação
        conn.commit()
        
        # Fecha o cursor e a conexão com o banco de dados
        cursor.close()
        conn.close()
        
        # Retorna uma resposta de sucesso
        return jsonify({'message': 'Usuário registrado com sucesso!'}), 200
    
    except cx_Oracle.DatabaseError as e:
        # Se ocorrer um erro ao interagir com o banco de dados, retorna uma resposta de erro
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
