from django.http import JsonResponse
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from APIs.logic_highlights import Highlighter
from APIs.logic_getArticle import GetArticle
from APIs.logic_qna import QNA

@api_view(['POST'])
def qna(request):
    data = request.data
    context= data.get('text', '')
    test = QNA()
    res=test.finalQuestionGenerator(context)  
    # print(context)   
    # q1={"questions":questions,"answers":answers}
    return JsonResponse(res)

@api_view(['POST'])
def highlightedSentences(request):
    data = request.data
    text= data.get('text', '')
    final = Highlighter(text, 0.35)
    s=final.getHighlightedSentences()
    return JsonResponse({'highlightedSentences': s})
@api_view(['POST'])
def getArticle(request):
    data = request.data
    url= data.get('url', '')
    final = GetArticle(url)
    newsArticle=final.getArticle()
    return JsonResponse({'newsArticle':newsArticle})