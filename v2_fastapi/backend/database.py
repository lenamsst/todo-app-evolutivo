from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# URL de conexão com o banco
SQLALCHEMY_DATABASE_URL = "postgresql://postgres:123456@localhost/fastapi_todo"

# Cria o engine de conexão
engine = create_engine(SQLALCHEMY_DATABASE_URL)

# Cria a sessão para interagir com o banco
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base para os modelos
Base = declarative_base()