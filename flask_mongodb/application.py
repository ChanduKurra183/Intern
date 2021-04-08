from flask import Flask, jsonify, request
from models import *
import json

app = Flask(__name__)
# db.init_app(app)

app.config['MONGODB_SETTINGS'] = {
    'db':'playerflask',
    'host':'mongodb://localhost/playerflask',
    'port':27017
}


@app.route('/addplayer', methods=["POST"])
def addplayer():
    player = json.loads(request.data)
    player1 = Player(id=player["player_id"],
        name=player["name"],
        team=player["team"],
        price=player["price"],
        )
    player1.save()
    return jsonify(player1.to_json())

@app.route('/getplayers', methods=["GET"])
def getplayers():
    players = Player.objects()
    return jsonify(players), 200


@app.route('/updateplayer', methods=["PATCH"])
def updateplayer():
    player = json.loads(request.data)
    player1 = Player.objects(player_id=player['player_id']).first()
    if not player1:
        return jsonify({'error': 'data not found'})
    else:
        player1.update(price=player['price'])
    return jsonify(player1.to_json())


@app.route('/deleteplayer', methods=['DELETE'])
def deleteplayer():
    player = json.loads(request.data)
    player1 = Player.objects(player_id=player['Player_id']).first()
    if not player1:
        return jsonify({'error': 'data not found'})
    else:
        player1.delete()
    return jsonify(player1.to_json())


if __name__ == "__main__":
    app.run(debug = True)