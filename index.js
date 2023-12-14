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

        let success = false;
        for (let j = 0; j < 15; j++) { // max 15 seconds
            const input = document.querySelector('#track-asset-input');
            if (input) {
                fillInput(input, wallets[i]);
                success = true;
                break;
            }
            await new Promise((resolve) => setTimeout(resolve, 1000));
        }
        await new Promise((resolve) => setTimeout(resolve, 1000));
        if (!success) { // stuck happened
            window.history.back();
            await new Promise((resolve) => setTimeout(resolve, 5000));
            i--;
            continue;
        }

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
