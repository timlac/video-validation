from sqlalchemy import Column, Integer, String, BigInteger, UniqueConstraint
from api.sql.base import Base, session_factory
from api.aws_services.s3_handler import get_bucket_contents

class UserData(Base):

    __tablename__ = 'tim'
    # __table_args__ = (UniqueConstraint('org_number'))

    id = Column(Integer, primary_key=True, index=True)
    video_key = Column(String(255))
    alias = Column(String(255))
    status = Column(Integer, index=True)
    reply = Column(String(255))

    def __init__(self, video_key, **kwargs):
        self.video_key = video_key
        self.status = 0


def create():
    session = session_factory()
    for key in get_bucket_contents():
        m = UserData(key)
        session.add(m)
        session.commit()
    session.close()


if __name__ == '__main__':
    create()