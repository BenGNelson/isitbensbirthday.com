.PHONY: open dev down deploy log log-remote log-table log-table-remote help

open: ## Open all 8 day experiences in your browser
	@./scripts/open-all.sh

dev: ## Start the local dev server (docker compose up)
	docker compose up

down: ## Stop the local dev server
	docker compose down

deploy: ## Deploy to production
	./scripts/deploy.sh

log: ## Print the local debug log to stdout (pipeable)
	@cat logs/debug.log 2>/dev/null || echo "(no log file yet)"

log-remote: ## Print the remote debug log to stdout over SSH (pipeable)
	@./scripts/read-log.sh --remote

log-table: ## Show local login attempts as a formatted table
	@cat logs/debug.log 2>/dev/null | python3 scripts/format-log.py

log-table-remote: ## Show remote login attempts as a formatted table
	@./scripts/read-log.sh --remote | python3 scripts/format-log.py

help: ## Show available commands
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
	  awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-10s\033[0m %s\n", $$1, $$2}'

.DEFAULT_GOAL := help
