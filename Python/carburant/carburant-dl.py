import requests
import os
os.chdir("/home/awakeneru/repos/file-transfer/Python/carburant")
LIENinstant = "https://www.data.gouv.fr/fr/datasets/r/edd67f5b-46d0-4663-9de9-e5db1c880160"
r = requests.get(LIENinstant)
open('prix-des-carburants-en-france-flux-instantane-v2.csv',
     'wb').write(r.content)