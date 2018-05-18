.DEFAULT_GOAL := all

GithubID = theworkingmen
RepoName = idb
SHA      = 9ab8e9c7e905579d92a153e1ba321c817580d565

FILES :=                         \
  frontend/src             \
	frontend/src/js          \
	frontend/src/images      \
	frontend/src/css         \
	backend/Database/        \
	backend/scrapers/        \
    .travis.yml

githubid:
	@echo "${GithubID}"

reponame:
	@echo "${RepoName}"

sha:
	@echo "${SHA}"

github:
	@echo "http://www.github.com/${GithubID}/${RepoName}"

issues:
	@echo "http://www.github.com/${GithubID}/${RepoName}/issues"

# make stories  - prints link to current phase's stories
stories:
	@echo "https://github.com/${GithubID}/${RepoName}/projects/7"

uml:
	@echo "https://github.com/${GithubID}/${RepoName}/blob/master/major_potential_UML.pdf"

# make selenium - runs selenium tests
selenium:
	python frontend/guitests.py

# make frontend - runs frontend tests
frontend:
	cd frontend; npm test

# make backend  - runs backend tests
backend:
	python backend/tests.py

# make backend  - runs backend tests
api-test:
	newman run tests/Postman.json

# make website  - prints link to a website
website:
	@echo "http://majorpotential.me/"

# make report   - prints link to technical report
report:
	@echo "http://${GithubID}.gitbooks.io/report/"

# make apidoc   - prints link to api documentation
apidoc:
	@echo "http://${GithubID}.gitbooks.io/api/"

# make self     - prints link to self critique
self:
	@echo "http://${GithubID}.gitbooks.io/report/self-critique.html"

# make other    - prints link to other critique
other:
	@echo "http://${GithubID}.gitbooks.io/report/other-critique.html"


.pylintrc:
	pylint --disable=locally-disabled --reports=no --generate-rcfile > $@

all:
	make format

check:
			@not_found=0;                                 \
	    for i in $(FILES);                            \
	    do                                            \
	        if [ -e $$i ];                            \
	        then                                      \
	            continue;                             \
	        else                                      \
	            echo "$$i NOT FOUND";                 \
	            not_found=`expr "$$not_found" + "1"`; \
	        fi                                        \
	    done;                                         \
	    if [ $$not_found -ne 0 ];                     \
	    then                                          \
	        echo "$$not_found failures";              \
	        exit 1;                                   \
	    fi;                                           \
	    echo "success";

clean:
	rm -f  .coverage
	rm -f  .pylintrc
	rm -f  *.pyc
	rm -f  *.tmp

config:
	git config -l

format:
	autopep8 -i "backend/Database/Universities/university.py"
	autopep8 -i "backend/Database/Universities/us_states.py"
	autopep8 -i "backend/Database/Universities/uni_api_func.py"
	autopep8 -i "backend/Database/Majors/major.py"
	autopep8 -i "backend/Database/Majors/majors_populate.py"
	autopep8 -i "backend/Database/Majors/major_api_func.py"
	autopep8 -i "backend/Database/Cities/cities_api_func.py"
	autopep8 -i "backend/Database/Cities/cities_populate.py"
	autopep8 -i "backend/Database/Cities/city.py"
	js-beautify -r -X frontend/src/js/*.js

scrub:
	make clean

status:
	make clean
	@echo
	git branch
	git status

deploy:
        sudo apt-get update
        sudo apt-get -y install cmake
        sudo apt-get install git
        sudo apt-get -y install graphviz
        sudo apt-get -y install git
        sudo apt-get -y install vim
        sudo apt-get install python
        sudo apt-get install python-pip
        pip install flask gunicorn
        git clone http://www.github.com/${GithubID}/${RepoName}
        pip install -r idb/backend/Database/requirements.txt
#to deploy -gunicorn application:application

travis:
	make clean
	ls -al
	make frontend
	make -r check
