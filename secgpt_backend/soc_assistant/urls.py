from django.urls import path
from .views import hello_api, analyze_logs, summarize_logs, generate_spl

urlpatterns = [
    path('hello/', hello_api),
    path('analyze/', analyze_logs),
    path('summarize/', summarize_logs),
    path('generate_spl/', generate_spl),
]
