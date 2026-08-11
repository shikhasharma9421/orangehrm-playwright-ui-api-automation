pipeline {
    agent any

    options {
        timestamps()
        timeout(time: 30, unit: 'MINUTES')
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    environment {
        CI = 'true'
        API_BASE_URL = 'https://reqres.in'
        REQRES_API_KEY = 'free_user_3EFxT7sYEVZjNrkTM8bYHGfhFfe'
        UI_BASE_URL = 'https://opensource-demo.orangehrmlive.com'
        USERNAME_DEMO = 'Admin'
        PASSWORD = 'admin123'
        // Public demo site + reqres.in free-tier key: not real secrets, safe to keep here directly.
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Write Env File') {
            steps {
                bat """
                    (
                        echo API_BASE_URL=%API_BASE_URL%
                        echo REQRES_API_KEY=%REQRES_API_KEY%
                        echo UI_BASE_URL=%UI_BASE_URL%
                        echo USERNAME_DEMO=%USERNAME_DEMO%
                        echo PASSWORD=%PASSWORD%
                    ) > .env
                """
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                bat 'npx playwright install --with-deps'
            }
        }

        stage('Typecheck') {
            steps {
                bat 'npm run typecheck'
            }
        }

        stage('Run Tests') {
            steps {
                bat 'npm test'
            }
        }
    }

    post {
        always {
            publishHTML(target: [
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright HTML Report'
            ])
            archiveArtifacts artifacts: 'test-results/**', allowEmptyArchive: true
            bat 'if exist .env del /f /q .env'
        }
        failure {
            echo 'Build failed — check Playwright HTML Report for details.'
        }
    }
}
