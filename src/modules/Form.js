import { module } from "modujs";


const URL = 'https://calendly.com/koliabez/call'

export default class extends module {
  constructor(m) {
    super(m);

    this.events = {
      submit: {
        submit: "onSubmit",
      },
      click: {
          'calendly': 'showCalendly'
      }
    };

    this.$inputs = Array.from(this.$("input"));
  }

//   init() {
//     this.el.addEventListener("submit", this.onSubmit.bind(this));

//     // Добавляем обработчик события для каждого input, чтобы отслеживать фокус
//     this.$inputs.forEach((input, index) => {
//       input.addEventListener("focus", () => this.onInputFocus(index));
//     });
//   }

  onInputFocus(index) {
    // Добавляем класс "active" текущему input
    this.$inputs.forEach((input, i) => {
      input.classList.toggle("active", i === index);
    });
  }

  init() {
    this.$inputs.forEach((input, index) => {
        input.addEventListener('keydown', (event) => this.onInputKeyDown(event, index));
    });
}


onInputKeyDown(event, currentIndex) {
    const isEnterKey = event.key === 'Enter';

    if (isEnterKey) {
        event.preventDefault();

        const currentInput = this.$inputs[currentIndex];
        const nextInputIndex = currentIndex + 1;

        if (currentInput.value === "") {
            console.log(`Current input is empty.`);
            currentInput.classList.add('error');
            
            const parentField = currentInput.closest('.c-form__field');
            if (parentField) {
                parentField.classList.add('error');
            }
        } else {
            currentInput.closest('.c-form__field').classList.remove('error');

            if (nextInputIndex < this.$inputs.length) {
                const nextInput = this.$inputs[nextInputIndex];
                nextInput.focus();
                this.onInputFocus(nextInputIndex); // Добавляем класс "active" следующему input
            } else {
                console.log("This is the last input. Form can be submitted.");
            }
        }
    }
}


hideCalendly() {
    document.getElementById("main-container").style.display = "none";
  }

  showCalendly() {
    // Initialize Calendly Embed



    // Calendly.initBadgeWidget({ 
    //     url: dynamicPath, 
    //     prefill: {
    //       name: customer.fname + ' ' + customer.lname,
    //       email: customer.email,
    //       customAnswers: {
    //         a1: customer.a1,
    //       },
    //       utm: {
    //         utmCampaign: tracking.utmCampaign,
    //         utmSource: tracking.utmSource,
    //         utmMedium: tracking.utmMedium,
    //         utmContent: tracking.utmContent,
    //         utmTerm: tracking.utmTerm,
    //       },  
    //     },
    //     text: 'Hi ' + customer.fname + '! ' + 'Make a Reservation.',
    //     color: '#000000', 
    //     textColor: '#ffffff', 
    //     branding: false
    // });


    Calendly.initPopupWidget({
      url: URL,
      prefill: {
        name: this.$inputs[0].value,
        email: this.$inputs[1].value,
        // Q1: "Yes",
        customAnswers: {
            a1: this.$inputs[2].value,
            // a2: 'asdasdad',
            // a3: 'asdasdad',
            // a4: 'asdasdad',
            // a5: 'asdasdad'
        }
      },
    });
  }




  destroy() {
    document.removeEventListener("keyup", this.closeBind);
  }
}
