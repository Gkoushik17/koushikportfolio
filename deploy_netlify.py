"""Deploy static site to Netlify using their API (no auth required for initial deploy)."""
import os
import json
import hashlib
import urllib.request
import urllib.error

SITE_DIR = os.path.dirname(os.path.abspath(__file__))
NETLIFY_API = "https://api.netlify.com/api/v1"

def get_files(directory):
    """Get all files with their SHA1 hashes."""
    files = {}
    for root, dirs, filenames in os.walk(directory):
        # Skip hidden dirs and the deploy script itself
        dirs[:] = [d for d in dirs if not d.startswith('.')]
        for fname in filenames:
            if fname.startswith('.') or fname == 'deploy_netlify.py':
                continue
            filepath = os.path.join(root, fname)
            relpath = '/' + os.path.relpath(filepath, directory).replace('\\', '/')
            with open(filepath, 'rb') as f:
                sha1 = hashlib.sha1(f.read()).hexdigest()
            files[relpath] = sha1
    return files

def api_request(url, data=None, method='POST', content_type='application/json'):
    """Make an API request to Netlify."""
    if data and content_type == 'application/json':
        data = json.dumps(data).encode('utf-8')
    req = urllib.request.Request(url, data=data, method=method)
    req.add_header('Content-Type', content_type)
    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            return json.loads(resp.read().decode('utf-8'))
    except urllib.error.HTTPError as e:
        body = e.read().decode('utf-8')
        print(f"HTTP Error {e.code}: {body}")
        raise

def main():
    print("Scanning files...")
    files = get_files(SITE_DIR)
    print(f"Found {len(files)} files:")
    for f in sorted(files.keys()):
        print(f"  {f}")
    
    # Step 1: Create a new site with file digests
    print("\nCreating Netlify site...")
    deploy_data = {
        "files": files
    }
    result = api_request(f"{NETLIFY_API}/sites", deploy_data)
    
    site_id = result.get('id')
    deploy_id = result.get('deploy_id')
    site_url = result.get('ssl_url') or result.get('url')
    required = result.get('required', [])
    
    print(f"Site ID: {site_id}")
    print(f"Deploy ID: {deploy_id}")
    print(f"Files to upload: {len(required)}")
    
    # Step 2: Upload required files
    hash_to_path = {v: k for k, v in files.items()}
    for file_hash in required:
        filepath = hash_to_path.get(file_hash)
        if not filepath:
            print(f"  Warning: hash {file_hash} not found in local files")
            continue
        
        local_path = os.path.join(SITE_DIR, filepath.lstrip('/').replace('/', os.sep))
        print(f"  Uploading: {filepath}")
        
        with open(local_path, 'rb') as f:
            file_data = f.read()
        
        upload_url = f"{NETLIFY_API}/deploys/{deploy_id}/files{filepath}"
        req = urllib.request.Request(upload_url, data=file_data, method='PUT')
        req.add_header('Content-Type', 'application/octet-stream')
        with urllib.request.urlopen(req, timeout=60) as resp:
            resp.read()
    
    print(f"\n{'='*60}")
    print(f"DEPLOYMENT SUCCESSFUL!")
    print(f"{'='*60}")
    print(f"Your portfolio is live at:")
    print(f"  {site_url}")
    print(f"{'='*60}")

if __name__ == '__main__':
    main()
