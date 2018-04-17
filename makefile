.DEFAULT_GOAL := all

GithubID = theworkingmen
RepoName = idb
SHA      = change_later

FILES :=                         \
    app/frontend/src             \
	app/frontend/src/js          \
	app/frontend/src/images      \
	app/frontend/src/css         \
	app/backend/Database/        \
	app/backend/scrapers/        \
	application.log 			 \
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

log:
	git log > application.log

all:
	make format
	make log

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
	rm -f  *.log

config:
	git config -l

format:
	autopep8 -i "app/backend/Database/university.py"
	autopep8 -i "app/backend/Database/us_states.py"
	autopep8 -i "app/backend/Database/major.py"
	autopep8 -i "app/backend/Database/city.py"

scrub:
	make clean
	rm -f  application.log

status:
	make clean
	@echo
	git branch
	git status

travis:
	make clean
	ls -al
	make all
	make -r check
