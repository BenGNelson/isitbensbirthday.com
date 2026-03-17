.PHONY: open dev down deploy help

open: ## Open all 8 day experiences in your browser
	@./scripts/open-all.sh

dev: ## Start the local dev server (docker compose up)
	docker compose up

down: ## Stop the local dev server
	docker compose down

deploy: ## Deploy to production
	./scripts/deploy.sh

help: ## Show available commands
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
	  awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-10s\033[0m %s\n", $$1, $$2}'

.DEFAULT_GOAL := help
