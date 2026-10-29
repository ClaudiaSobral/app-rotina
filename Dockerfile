FROM python:3.14.7

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY pipeline/ pipeline/
COPY data/exemplos data/exemplos

CMD ["pytest"]