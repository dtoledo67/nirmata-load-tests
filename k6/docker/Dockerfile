# Use an official Node.js runtime as the base image
FROM grafana/k6 

# Copy your k6 test script to the container (assuming it's in the same directory as the Dockerfile)
ADD  tests tests
ADD  run-tests.sh run-tests.sh 

# Expose any necessary ports (if your k6 test script needs to make external requests)
# EXPOSE 80

RUN which k6

CMD ["run-tests.sh"]

