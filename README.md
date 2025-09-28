# Firepoker-app-Cheat
Firepoker - Agile Planning Poker - Console cheat code to expose unrevealed poker cards

# One‑line summary
Identified a presentation‑layer weakness in the Firepoker.app planning‑poker UI where client‑side rendering assumptions allow hidden elements to become visible. This repo documents the finding, provides a high‑level breakdown of the observed client behavior, and recommends concrete mitigations.

# 🚨 Impact
- Hidden estimates (votes) can be exposed through client‑side manipulation of the UI presentation.
- This affects trust & fairness during planning sessions.
- Root cause: the UI relies on client‑only display rules rather than enforcing reveal semantics server‑side.

# Pseudocode
Find all current UI items that are intended to be hidden
     for each found item:
         change the presentation attributes so it renders visibly
``` javascript
function applyDisplayBlock() {
        document.querySelectorAll('.list-item .text-center').forEach(el => {
            el.style.display = 'block';
        });
    }
```
Apply to existing elements
``` javascript
 applyDisplayBlock();
```
create an observer that listens for DOM additions
     for every new node added:
         if the new node matches the pattern for an estimate element:
             change its presentation attributes to render visibly
``` javascript
const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if(node.nodeType === 1){
                    if(node.matches('.list-item .text-center')) {
                        node.style.display = 'block';
                    } else {
                        node.querySelectorAll?.('.list-item .text-center').forEach(el => {
                            el.style.display = 'block';
                        });
                    }
                }
            });
        });
    });
```
run revealExistingItems and start observeNewItems
``` javascript
observer.observe(document.body, {
        childList: true,
        subtree: true
    });
```

# 🔍 Why this is a vulnerability (root cause)

- Presentation ≠ Authority — The UI assumes the browser alone controls whether a card is hidden; it treats presentation as the ground truth.
- Client trust — Any client that can control the presentation layer (console, modified client, browser extension) can alter what the user sees.
- No server enforcement — There is no server‑side control or verification that enforces when a vote should be revealed to participants. That gap is what makes the presentation manipulation impactful.

  # Documentation in this repo is provided for security hardening and educational purposes.
