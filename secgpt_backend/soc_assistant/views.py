from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .splunk_handler import run_spl_query
from .log_analyst import analyze_log_with_llm, summarize_log
from .splgenerator import generate_spl_query

@api_view(['GET'])
def hello_api(request):
    return Response({'message': 'Hello from SecGPT API!'})

@api_view(['POST'])
def analyze_logs(request):
    mode=request.data.get('mode')
    if mode == 'spl':
        query = request.data.get('query')
        if not query:
            return Response('error: Missing SPL query', status = 400)
        logs = run_spl_query(query)
    elif mode == 'log':
        logs=request.data.get('log_data')
        if not logs:
            return Response('error: Missing Log data', status=400)
    else:
        return Response('error: Invalid mode', status=400)
    
    analysis = analyze_log_with_llm(logs)
    return Response({'analysis': analysis}, status=200)

@api_view(['POST'])
def summarize_logs(request):
    if request.data.get('mode') != 'log':
        return Response('error: Invalid log submission for summarization', status=400)
    logs = request.data.get('log_data')
    if not logs:
        return Response('error: Missing Log data', status=400)
    summary = summarize_log(logs)
    return Response({'summary': summary}, status=200)


@api_view(['POST'])
def generate_spl(request):
    messages = request.data.get('messages')
    prompt = request.data.get('prompt')

    if messages and not isinstance(messages, list):
        return Response({"error": "'messages' must be a list."}, status=400)
    if prompt and not isinstance(prompt, str):
        return Response({"error": "'prompt' must be a string."}, status=400)
    if not messages and not prompt:
        return Response({"error": "Either 'prompt' or 'messages' is required."}, status=400)

    try:
        spl = generate_spl_query(prompt=prompt, messages=messages)
        return Response({"spl": spl})
    except Exception as e:
        return Response({"error": str(e)}, status=500)



