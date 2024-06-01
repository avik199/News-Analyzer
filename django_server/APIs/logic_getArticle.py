from newspaper import Article

class GetArticle: 
    def __init__(self,url):
        self.url=url
        self.article = Article(self.url)

    def getArticle(self):
        
        self.article.download()
        self.article.parse()
        return self.article.text
    
    def getSummary(self):
        self.article.nlp()
        return self.article.summary
