
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

engine = create_engine('postgresql://username:password@majorpotential-database.coujqf2v990h.us-east-1.rds.amazonaws.com/majorpotential')
Session = sessionmaker(bind=engine)

Base = declarative_base()
