from sqlalchemy.ext.declarative import declarative_base, DeferredReflection
from sqlalchemy.orm import sessionmaker
from api.sql.connection_handler import ConnectionHandler


engine = ConnectionHandler.get_engine()
# use session_factory() to get a new Session
_SessionFactory = sessionmaker(bind=engine)

Base = declarative_base()


def create_all():
    Base.metadata.create_all(engine)


def session_factory():
    Base.metadata.create_all(engine)
    return _SessionFactory()


def session_factory_raw():
    return _SessionFactory()
