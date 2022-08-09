from flask import Flask, jsonify, abort, request, send_from_directory
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_swagger_ui import get_swaggerui_blueprint
import os

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_mapping(
        SECRET_KEY='dev',
        SQLALCHEMY_DATABASE_URI = 'postgresql+psycopg2://admin:password@' + os.getenv('DATABASE', 'localhost') + '/cargillapplication',
        SQLALCHEMY_TRACK_MODIFICATIONS = False
    )
    CORS(app)

    # Swagger configuration
    swaggerBlueprint = get_swaggerui_blueprint('/swagger', 'http://localhost:5000/swagger.yaml', config={'app_name': 'Cargill Application'})
    app.register_blueprint(swaggerBlueprint)

    # Database configuration
    db.init_app(app)
    from .models import Team, Role
    with app.app_context():
        #db.drop_all()
        db.create_all()

    # Controllers
    from .controllers.teamController import bp as teamBp
    app.register_blueprint(teamBp)

    from .controllers.roleController import bp as roleBp
    app.register_blueprint(roleBp)
   
    # Swagger endpoint
    @app.route('/swagger.yaml')
    def getSwagger():
        print(os.getcwd())
        return send_from_directory(os.getcwd(), "swagger.yaml")

    return app