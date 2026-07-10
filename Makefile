.PHONY: open dev down deploy test test-static test-smoke check-secrets help

open: ## Open all 8 day experiences in your browser
	@./scripts/open-all.sh

dev: ## Start the local dev server (docker compose up)
	docker compose up

down: ## Stop the local dev server
	docker compose down

test: ## Run all checks (static + smoke + secrets); needs `make dev` running
	@./scripts/test.sh

test-static: ## Run offline checks only (no server needed)
	@./scripts/test.sh --static

test-smoke: ## Run HTTP checks against the running dev container
	@./scripts/test.sh --smoke

check-secrets: ## Fail if any personal info would be committed
	@./scripts/check-secrets.sh

deploy: ## Deploy to production (runs tests + secret scan first)
	@./scripts/test.sh --static && ./scripts/check-secrets.sh && ./scripts/deploy.sh

help: ## Show available commands
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
	  awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-10s\033[0m %s\n", $$1, $$2}'

.DEFAULT_GOAL := help
