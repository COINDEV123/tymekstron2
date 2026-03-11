#!/usr/bin/env python3
"""Simple HTTP server with Range request support for audio seeking."""
import os, re
from http.server import HTTPServer, SimpleHTTPRequestHandler

class RangeHTTPRequestHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        if 'Range' not in self.headers:
            return super().do_GET()
        
        path = self.translate_path(self.path)
        if not os.path.isfile(path):
            self.send_error(404)
            return
        
        file_size = os.path.getsize(path)
        range_header = self.headers['Range']
        match = re.match(r'bytes=(\d+)-(\d*)', range_header)
        if not match:
            self.send_error(416)
            return
        
        start = int(match.group(1))
        end = int(match.group(2)) if match.group(2) else file_size - 1
        end = min(end, file_size - 1)
        length = end - start + 1
        
        self.send_response(206)
        ctype = self.guess_type(path)
        self.send_header('Content-Type', ctype)
        self.send_header('Content-Range', f'bytes {start}-{end}/{file_size}')
        self.send_header('Content-Length', str(length))
        self.send_header('Accept-Ranges', 'bytes')
        self.end_headers()
        
        with open(path, 'rb') as f:
            f.seek(start)
            self.wfile.write(f.read(length))

    def end_headers(self):
        self.send_header('Accept-Ranges', 'bytes')
        super().end_headers()

if __name__ == '__main__':
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    server = HTTPServer(('', 8080), RangeHTTPRequestHandler)
    print('Serving on http://localhost:8080 (with range request support)')
    server.serve_forever()
