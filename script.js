(function() {
    function applyDisplayBlock() {
        document.querySelectorAll('.list-item .text-center').forEach(el => {
            el.style.display = 'block';
        });
    }

    applyDisplayBlock();

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

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();
