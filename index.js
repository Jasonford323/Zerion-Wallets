(function() {
    const wallets = [
        "0xbaa93498a3bf60d01ef28ede66ba8bfd05975a4a",
    ];

    
    function fillInput(input, value) {
      input.setAttribute('value', value);
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }
    
    async function addWallets() {
      for (let i = 0; i < wallets.length; i++) {
        console.log(`Добавление кошелька ${i + 1} из ${wallets.length}`);

        const input = document.querySelector('#track-asset-input');
        fillInput(input, wallets[i]);
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const spans = document.querySelectorAll('span');
        spans.forEach(span => {
            try {
                span.click();
            } catch (ignore) {}
          });
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const divs = document.querySelectorAll('div')
        divs.forEach(div => {
            if (div.textContent == 'To My Wallets') {
                div.click()
            }
        });

        await new Promise((resolve) => setTimeout(resolve, 5000));
        window.history.back();
        window.history.back();
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    
      console.log('Завершено');
    }
    
    addWallets();
   })();
