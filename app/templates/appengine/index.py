import os
import webapp2
from google.appengine.ext.webapp import template

class MainHandler( webapp2.RequestHandler ):

    def get( self ):
        self.response.headers['Content-Type'] = 'text/html'
        tmpl = os.path.join( os.path.dirname(__file__), 'templates/index.tmpl' )
        tmplvars = {
            'msg': 'AppEngine works!'
        }
        self.response.out.write( template.render( tmpl, tmplvars ) )


app = webapp2.WSGIApplication( 
        [
            ('/', MainHandler)
        ], 
        debug=True 
    )