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

        // wait until connect-wallet page is fully loaded
        let success = false;
        for (let j = 0; j < 10; j++) { // max 10 seconds
            const input = document.querySelector('#track-asset-input');
            if (input) {
                fillInput(input, wallets[i]);
                success = true;
                break;
            }
            await new Promise((resolve) => setTimeout(resolve, 1000));
        }
        await new Promise((resolve) => setTimeout(resolve, 1000));
        if (!success) {
            console.log('stuck happened, went too back, going forward now');
            window.history.forward();
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

        // wait until address page is fully loaded
        success = false;
        for (let j = 0; j < 10; j++) { // max 10 seconds
            const divs = document.querySelectorAll('div');
            divs.forEach(div => {
                if (div.textContent == 'Remove wallet') {
                    success = true;
                }
            });
            if (success) break;
            await new Promise((resolve) => setTimeout(resolve, 1000));
        }
        await new Promise((resolve) => setTimeout(resolve, 3000));

        console.log('history:', window.history)

        while (window.location.href !== 'https://app.zerion.io/connect-wallet') {
            window.history.back();
            await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }
    
      console.log('Завершено');
    }
    
    addWallets();
   })();
