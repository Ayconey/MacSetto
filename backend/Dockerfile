FROM python:3.9-alpine3.13
LABEL maintainer="MacSet.com"
ENV PYTHONUNBUFFERED 1
WORKDIR /code
COPY ./requirements.txt /requirements.txt
RUN  python -m venv /py && \
    /py/bin/pip install --upgrade pip && \
    apk add --update --no-cache postgresql-client && \
    apk add --update --no-cache --virtual .tmp-deps \
        build-base postgresql-dev musl-dev linux-headers && \
    /py/bin/pip install -r /requirements.txt && \
    apk del .tmp-deps
COPY . /code/
EXPOSE 8000
ENV PATH="/scripts:/py/bin:$PATH"
CMD ["run.sh"]