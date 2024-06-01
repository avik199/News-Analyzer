from django.contrib import admin
from django.urls import include, path
from . import views

urlpatterns = [
    path("getArticle",views.getArticle,name="getArticle"),
    path("qna",views.qna, name="qna"),
    path("highlightedSentences",views.highlightedSentences, name="highlightedSentences"),
]