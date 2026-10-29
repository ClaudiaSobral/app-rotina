# Resumo do projeto
> Desenvolvimento de projeto de Engenharia de Dados e Desenvolvimento para otimização de rotina.

- Essa aplicação visa capturar dados de rotina em sessões únicas para gerar gráficos de produtividade.
- Contém: um cronômetro, gráficos e opção de exportar CSV ou JSON dos eventos.

## Stacks previstas

```Docker``` ```pytest``` ```Airflow``` ```PySpark``` ```Parquet``` ```Delta``` ```Arquitetura Medallion``` ```AWS S3``` ```AWS Glue``` ```AWS Athena``` ```AWS Lambda``` ```React```

## Como testar

Rode o seguinte código no seu terminal:

```
docker build -t rotina-pipeline
docker run --rm rotina-pipeline
```