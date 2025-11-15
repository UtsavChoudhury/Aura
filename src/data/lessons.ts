export const lessonContent: Record<string, any> = {
  // Just Starting to Learn About Money
  'money-basics-1': {
    id: 'money-basics-1',
    title: 'What is Money?',
    emoji: '💰',
    money: 50,
    xp: 50,
    questions: [
      {
        id: 1,
        type: 'mcq',
        question: 'What is the main purpose of money?',
        emoji: '🤔',
        options: [
          'To trade for goods and services',
          'To collect and store in a safe',
          'To make paper airplanes',
          'Only for decoration'
        ],
        correctAnswer: 'To trade for goods and services',
        explanation: 'Money is a medium of exchange! It makes trading easier - instead of swapping chickens for bread, we use money! 💵'
      },
      {
        id: 2,
        type: 'mcq',
        question: 'If you have $10 and spend $3, how much do you have left?',
        emoji: '🧮',
        options: [
          '$7',
          '$13',
          '$3',
          '$10'
        ],
        correctAnswer: '$7',
        explanation: 'Perfect! $10 - $3 = $7. Always subtract what you spend from what you have! 📊'
      },
      {
        id: 3,
        type: 'mcq',
        question: 'What does it mean to "save" money?',
        emoji: '🏦',
        options: [
          'Keep it for later instead of spending it now',
          'Give it all away to friends',
          'Hide it under your mattress',
          'Spend it as fast as possible'
        ],
        correctAnswer: 'Keep it for later instead of spending it now',
        explanation: 'Saving means setting money aside for future use! It helps you reach bigger goals and stay prepared for emergencies. 🎯'
      },
      {
        id: 4,
        type: 'input',
        question: 'If you save $5 every week for 4 weeks, how much will you have saved in total?',
        emoji: '💰',
        correctAnswer: '20',
        explanation: 'Excellent! $5 × 4 weeks = $20. Regular saving adds up faster than you think! 🌟'
      },
      {
        id: 5,
        type: 'mcq',
        question: 'Which is the safest place to keep your money?',
        emoji: '🏦',
        options: [
          'In a bank account',
          'In your sock drawer',
          'In your backpack',
          'Under your pillow'
        ],
        correctAnswer: 'In a bank account',
        explanation: 'Banks keep your money safe and secure! Plus, they might even pay you interest for keeping your money there. 🔒'
      }
    ]
  },

  'money-basics-2': {
    id: 'money-basics-2',
    title: 'Needs vs Wants',
    emoji: '🤔',
    money: 50,
    xp: 50,
    questions: [
      {
        id: 1,
        type: 'mcq',
        question: 'What is a "need"?',
        emoji: '🏠',
        options: [
          'Something you must have to survive and be healthy',
          'Something you really, really want',
          'The newest video game',
          'Designer clothes'
        ],
        correctAnswer: 'Something you must have to survive and be healthy',
        explanation: 'Needs are essentials like food, water, shelter, and clothing. Without these, life would be very difficult! 🎯'
      },
      {
        id: 2,
        type: 'mcq',
        question: 'Which of these is a NEED?',
        emoji: '🍎',
        options: [
          'Healthy food to eat',
          'The latest smartphone',
          'Designer sneakers',
          'Concert tickets'
        ],
        correctAnswer: 'Healthy food to eat',
        explanation: 'Food is a basic need! You need it to survive and stay healthy. The other items are wants - nice to have but not essential. 🍏'
      },
      {
        id: 3,
        type: 'mcq',
        question: 'What is a "want"?',
        emoji: '🎮',
        options: [
          'Something you would like to have but can live without',
          'Something you need to survive',
          'Only food and water',
          'Medical care'
        ],
        correctAnswer: 'Something you would like to have but can live without',
        explanation: 'Wants are things that make life more fun or comfortable, but you can survive without them! Like games, toys, and entertainment. ✨'
      },
      {
        id: 4,
        type: 'mcq',
        question: 'You have $20. Which should you buy first?',
        emoji: '💡',
        options: [
          'A warm winter coat (you have none)',
          'A new video game (you have 10 already)',
          'Candy and snacks',
          'A toy you saw on TV'
        ],
        correctAnswer: 'A warm winter coat (you have none)',
        explanation: 'Smart choice! A winter coat is a NEED if you don\'t have one - it keeps you warm and healthy. Always prioritize needs over wants! 🧥'
      },
      {
        id: 5,
        type: 'mcq',
        question: 'Which of these is a WANT?',
        emoji: '👟',
        options: [
          'Expensive brand-name sneakers when you have shoes',
          'A place to live',
          'Medicine when you\'re sick',
          'School supplies for class'
        ],
        correctAnswer: 'Expensive brand-name sneakers when you have shoes',
        explanation: 'If you already have shoes that work, expensive brand-name sneakers are a want! Shelter, medicine, and school supplies are all needs. 💯'
      }
    ]
  },

  'money-basics-3': {
    id: 'money-basics-3',
    title: 'Saving Your First $100',
    emoji: '🎯',
    money: 75,
    xp: 75,
    questions: [
      {
        id: 1,
        type: 'mcq',
        question: 'What\'s the best way to start saving money?',
        emoji: '💡',
        options: [
          'Set aside a small amount regularly from any money you get',
          'Wait until you\'re older to start saving',
          'Only save if you get a lot of money at once',
          'Spend first, save whatever is left over'
        ],
        correctAnswer: 'Set aside a small amount regularly from any money you get',
        explanation: 'Starting small and being consistent is the secret! Even saving $5 a week adds up to $260 in a year! 🌟'
      },
      {
        id: 2,
        type: 'input',
        question: 'If you save $10 every week, how many weeks will it take to save $100?',
        emoji: '🧮',
        correctAnswer: '10',
        explanation: 'Great math! $100 ÷ $10 per week = 10 weeks. That\'s less than 3 months to reach your goal! 📈'
      },
      {
        id: 3,
        type: 'mcq',
        question: 'What is a "savings goal"?',
        emoji: '🎯',
        options: [
          'A specific amount of money you plan to save for something',
          'Guessing how much you might save',
          'Hoping money appears magically',
          'Spending money on whatever you want'
        ],
        correctAnswer: 'A specific amount of money you plan to save for something',
        explanation: 'A savings goal gives you a target! Like "I want to save $100 for a new bike." Goals help you stay motivated! 🚴'
      },
      {
        id: 4,
        type: 'mcq',
        question: 'What\'s a good strategy to avoid spending your savings?',
        emoji: '🏦',
        options: [
          'Put it in a separate savings account or piggy bank',
          'Keep it in your wallet',
          'Hide it in your room',
          'Tell everyone you have it'
        ],
        correctAnswer: 'Put it in a separate savings account or piggy bank',
        explanation: 'Out of sight, out of mind! Separating your savings makes it harder to spend impulsively. 🐷'
      },
      {
        id: 5,
        type: 'mcq',
        question: 'You have $50 saved and want a $100 toy. What should you do?',
        emoji: '🤔',
        options: [
          'Keep saving until you have $100',
          'Buy it with a credit card',
          'Give up on the goal',
          'Borrow money from everyone'
        ],
        correctAnswer: 'Keep saving until you have $100',
        explanation: 'Patience pays off! Keep saving and you\'ll reach your goal. Borrowing or using credit creates debt you\'ll have to pay back later. 💪'
      },
      {
        id: 6,
        type: 'mcq',
        question: 'What\'s a benefit of saving money?',
        emoji: '✨',
        options: [
          'You\'ll be prepared for emergencies and can buy things you really want',
          'Money loses value in savings',
          'You\'ll forget you have it',
          'It makes you sad'
        ],
        correctAnswer: 'You\'ll be prepared for emergencies and can buy things you really want',
        explanation: 'Saving creates security and freedom! You\'ll be ready for surprises and can afford bigger, better things. 🎉'
      }
    ]
  },

  'money-basics-4': {
    id: 'money-basics-4',
    title: 'Understanding Interest',
    emoji: '✨',
    money: 75,
    xp: 75,
    questions: [
      {
        id: 1,
        type: 'mcq',
        question: 'What is interest?',
        emoji: '💰',
        options: [
          'Money you earn for saving or pay for borrowing',
          'A feeling of curiosity',
          'Free money that appears',
          'A type of bank'
        ],
        correctAnswer: 'Money you earn for saving or pay for borrowing',
        explanation: 'Interest works both ways! Banks pay YOU interest for keeping money in savings, but you pay THEM interest when you borrow. 📊'
      },
      {
        id: 2,
        type: 'input',
        question: 'If you save $100 and earn 5% interest in one year, how much interest do you earn? (Just the number)',
        emoji: '🧮',
        correctAnswer: '5',
        explanation: 'Perfect! $100 × 5% = $5 interest. After one year, you\'d have $105 total! That\'s free money for saving! 💵'
      },
      {
        id: 3,
        type: 'mcq',
        question: 'What is "compound interest"?',
        emoji: '🚀',
        options: [
          'Earning interest on your interest - your money grows faster',
          'Interest that is very complicated',
          'Interest you only get once',
          'Interest that decreases over time'
        ],
        correctAnswer: 'Earning interest on your interest - your money grows faster',
        explanation: 'Compound interest is magical! You earn interest on your original money PLUS the interest you already earned. It snowballs! ❄️'
      },
      {
        id: 4,
        type: 'mcq',
        question: 'If you borrow money, what happens with interest?',
        emoji: '💳',
        options: [
          'You have to pay back more than you borrowed',
          'You pay back exactly what you borrowed',
          'You pay back less than you borrowed',
          'Interest doesn\'t apply to borrowing'
        ],
        correctAnswer: 'You have to pay back more than you borrowed',
        explanation: 'Borrowing costs money! If you borrow $100 at 10% interest, you\'ll owe $110. That\'s why saving is better than borrowing! ⚠️'
      },
      {
        id: 5,
        type: 'mcq',
        question: 'Which is better for saving money?',
        emoji: '📈',
        options: [
          'A savings account that pays interest',
          'Keeping cash under your bed',
          'Carrying it in your pocket',
          'Hiding it in random places'
        ],
        correctAnswer: 'A savings account that pays interest',
        explanation: 'A savings account is a win-win! Your money is safe AND it grows with interest. Cash under your bed just sits there! 🏦'
      },
      {
        id: 6,
        type: 'mcq',
        question: 'The longer you save money earning interest, what happens?',
        emoji: '⏰',
        options: [
          'Your money grows more and more',
          'Your money stays the same',
          'Your money disappears',
          'Interest stops working'
        ],
        correctAnswer: 'Your money grows more and more',
        explanation: 'Time is your friend with savings! The longer you save with compound interest, the faster your money grows. Start early! 🌱'
      }
    ]
  },

  // First Bank Card
  'bank-card-1': {
    id: 'bank-card-1',
    title: 'Opening Your First Account',
    emoji: '🏦',
    money: 100,
    xp: 100,
    questions: [
      {
        id: 1,
        type: 'mcq',
        question: 'What age can you typically open your first bank account?',
        emoji: '🎂',
        options: [
          'Any age, with a parent or guardian',
          'Only when you turn 25',
          'Only when you get a job',
          'Never, banks are only for adults'
        ],
        correctAnswer: 'Any age, with a parent or guardian',
        explanation: 'Great! You can open a bank account at any age with a parent or guardian helping you. Many banks offer special youth accounts! 🌟'
      },
      {
        id: 2,
        type: 'mcq',
        question: 'What is a checking account mainly used for?',
        emoji: '💳',
        options: [
          'Everyday spending and paying bills',
          'Long-term savings only',
          'Investing in stocks',
          'Buying a house'
        ],
        correctAnswer: 'Everyday spending and paying bills',
        explanation: 'Checking accounts are for money you need to use soon - paying for things, getting cash, and paying bills! 💵'
      },
      {
        id: 3,
        type: 'mcq',
        question: 'What is a savings account best for?',
        emoji: '🎯',
        options: [
          'Keeping money for future goals and emergencies',
          'Making daily purchases',
          'Paying monthly bills',
          'Buying snacks'
        ],
        correctAnswer: 'Keeping money for future goals and emergencies',
        explanation: 'Savings accounts are perfect for money you don\'t need right now! They often earn interest, so your money grows over time. 🌱'
      },
      {
        id: 4,
        type: 'input',
        question: 'If your savings account earns 2% interest and you have $100, how much interest will you earn in one year? (Round to nearest dollar)',
        emoji: '🧮',
        correctAnswer: '2',
        explanation: 'Perfect! $100 × 2% = $2. That\'s free money just for saving! Interest rates might seem small, but they add up! ✨'
      },
      {
        id: 5,
        type: 'mcq',
        question: 'What information will the bank typically ask for when opening an account?',
        emoji: '📋',
        options: [
          'Your ID, address, and Social Security number',
          'Your favorite color and pet\'s name',
          'Only your phone number',
          'Just your name'
        ],
        correctAnswer: 'Your ID, address, and Social Security number',
        explanation: 'Banks need to verify your identity to keep your money safe! They\'ll ask for official documents like ID and Social Security number. 🔒'
      },
      {
        id: 6,
        type: 'mcq',
        question: 'What does it mean to "deposit" money?',
        emoji: '💰',
        options: [
          'Put money into your account',
          'Take money out of your account',
          'Send money to a friend',
          'Pay a bill'
        ],
        correctAnswer: 'Put money into your account',
        explanation: 'A deposit means adding money to your account! You can deposit cash, checks, or transfer money electronically. 📥'
      }
    ]
  },

  // First Summer Job
  'summer-job-1': {
    id: 'summer-job-1',
    title: 'Understanding Your Paycheck',
    emoji: '💵',
    money: 100,
    xp: 100,
    questions: [
      {
        id: 1,
        type: 'mcq',
        question: 'What is "gross pay"?',
        emoji: '💰',
        options: [
          'Your total earnings before any deductions',
          'The money you take home',
          'Only your tips',
          'Your hourly rate'
        ],
        correctAnswer: 'Your total earnings before any deductions',
        explanation: 'Gross pay is the total amount you earned before taxes and other deductions. It\'s your "before" number! 📊'
      },
      {
        id: 2,
        type: 'mcq',
        question: 'What is "net pay"?',
        emoji: '✅',
        options: [
          'The actual money you take home after deductions',
          'Your total earnings before taxes',
          'Your hourly rate',
          'Money you owe the company'
        ],
        correctAnswer: 'The actual money you take home after deductions',
        explanation: 'Net pay is what you actually receive after taxes and deductions. This is the money that goes into your bank account! 💵'
      },
      {
        id: 3,
        type: 'input',
        question: 'If you work 20 hours at $15 per hour, what is your gross pay?',
        emoji: '🧮',
        correctAnswer: '300',
        explanation: 'Excellent math! 20 hours × $15 = $300 gross pay. Remember, your take-home will be less after taxes! 📈'
      },
      {
        id: 4,
        type: 'mcq',
        question: 'What are payroll taxes used for?',
        emoji: '🏛️',
        options: [
          'Government programs like Social Security and Medicare',
          'Your boss\'s salary',
          'Company parties',
          'Office supplies'
        ],
        correctAnswer: 'Government programs like Social Security and Medicare',
        explanation: 'Payroll taxes fund important government programs! They help pay for Social Security (retirement), Medicare (healthcare), and other services. 🇺🇸'
      },
      {
        id: 5,
        type: 'mcq',
        question: 'If your gross pay is $300 and taxes are $45, what is your net pay?',
        emoji: '💵',
        options: [
          '$255',
          '$300',
          '$345',
          '$45'
        ],
        correctAnswer: '$255',
        explanation: 'Perfect! $300 - $45 = $255 net pay. This is what you\'ll actually receive! Always remember to budget based on your net pay, not gross. 💡'
      },
      {
        id: 6,
        type: 'mcq',
        question: 'What should you do with your first paycheck?',
        emoji: '🎯',
        options: [
          'Save some, spend some wisely, and celebrate a little!',
          'Spend it all immediately',
          'Hide it under your bed',
          'Give it all away'
        ],
        correctAnswer: 'Save some, spend some wisely, and celebrate a little!',
        explanation: 'Great thinking! A balanced approach is best - save for your future, be responsible with spending, and treat yourself a bit. You earned it! 🎉'
      }
    ]
  },

  // First Credit Card
  'credit-card-1': {
    id: 'credit-card-1',
    title: 'Credit Card Basics',
    emoji: '💳',
    money: 150,
    xp: 150,
    questions: [
      {
        id: 1,
        type: 'mcq',
        question: 'What is the main difference between a debit card and a credit card?',
        emoji: '💳',
        options: [
          'Debit uses your own money, credit borrows money',
          'They are exactly the same',
          'Credit cards are free money',
          'Debit cards charge interest'
        ],
        correctAnswer: 'Debit uses your own money, credit borrows money',
        explanation: 'Exactly! A debit card takes money directly from your bank account (your money), while a credit card lets you borrow money that you must pay back later. 💡'
      },
      {
        id: 2,
        type: 'mcq',
        question: 'What is an APR (Annual Percentage Rate)?',
        emoji: '📊',
        options: [
          'The yearly interest rate you pay on borrowed money',
          'The number of cards you can have',
          'A type of reward points',
          'Your credit limit'
        ],
        correctAnswer: 'The yearly interest rate you pay on borrowed money',
        explanation: 'APR is the cost of borrowing! If you don\'t pay your full balance, you\'ll pay interest based on the APR. Lower is better! 📉'
      },
      {
        id: 3,
        type: 'mcq',
        question: 'What is a credit limit?',
        emoji: '🚫',
        options: [
          'The maximum amount you can borrow on the card',
          'How many cards you can own',
          'The minimum payment amount',
          'Your credit score'
        ],
        correctAnswer: 'The maximum amount you can borrow on the card',
        explanation: 'Your credit limit is like a ceiling - it\'s the most you can charge on the card. Going over can result in fees! 🎯'
      },
      {
        id: 4,
        type: 'input',
        question: 'If your credit limit is $1,000 and you charge $600, how much credit do you have left?',
        emoji: '🧮',
        correctAnswer: '400',
        explanation: 'Perfect! $1,000 - $600 = $400 remaining. It\'s smart to keep your balance low compared to your limit! ✅'
      },
      {
        id: 5,
        type: 'mcq',
        question: 'What happens if you only pay the minimum payment each month?',
        emoji: '⚠️',
        options: [
          'You\'ll pay lots of interest and take years to pay off',
          'Your balance disappears',
          'You get rewards',
          'Nothing bad happens'
        ],
        correctAnswer: 'You\'ll pay lots of interest and take years to pay off',
        explanation: 'Minimum payments are a trap! You\'ll pay tons in interest. Always try to pay your FULL balance each month to avoid interest charges! 💰'
      },
      {
        id: 6,
        type: 'mcq',
        question: 'What\'s the best way to use a credit card?',
        emoji: '✨',
        options: [
          'Only charge what you can afford and pay the full balance monthly',
          'Max it out every month',
          'Pay only the minimum',
          'Never check your statements'
        ],
        correctAnswer: 'Only charge what you can afford and pay the full balance monthly',
        explanation: 'Perfect! Treat your credit card like a debit card - only spend what you have, and pay it off in full each month. This builds credit without paying interest! 🌟'
      }
    ]
  },

  // First Car
  'first-car-1': {
    id: 'first-car-1',
    title: 'Buying vs Leasing',
    emoji: '🚗',
    money: 150,
    xp: 150,
    questions: [
      {
        id: 1,
        type: 'mcq',
        question: 'What does it mean to "buy" a car?',
        emoji: '🚗',
        options: [
          'You own the car outright (or will after paying off a loan)',
          'You rent the car short-term',
          'You borrow the car from a friend',
          'You share ownership with the dealer'
        ],
        correctAnswer: 'You own the car outright (or will after paying off a loan)',
        explanation: 'When you buy, the car is yours! You can keep it as long as you want, customize it, and eventually own it free and clear. 🎉'
      },
      {
        id: 2,
        type: 'mcq',
        question: 'What does it mean to "lease" a car?',
        emoji: '📋',
        options: [
          'You rent the car for a set period (usually 2-3 years)',
          'You own the car forever',
          'You buy the car with no payments',
          'The car is free'
        ],
        correctAnswer: 'You rent the car for a set period (usually 2-3 years)',
        explanation: 'Leasing is like long-term renting! You make monthly payments but must return the car at the end. You never own it. 🔄'
      },
      {
        id: 3,
        type: 'mcq',
        question: 'What is a major downside of leasing?',
        emoji: '⚠️',
        options: [
          'You never own the car and have mileage limits',
          'The car is too expensive',
          'You can drive unlimited miles',
          'Lower monthly payments'
        ],
        correctAnswer: 'You never own the car and have mileage limits',
        explanation: 'Leases often limit how many miles you can drive (like 12,000/year). Go over and you pay penalties! Plus, you\'re always making payments. 😰'
      },
      {
        id: 4,
        type: 'mcq',
        question: 'What is a benefit of buying a car?',
        emoji: '✅',
        options: [
          'You own it and can do whatever you want with it',
          'Monthly payments never end',
          'You must return it after 3 years',
          'You can\'t customize it'
        ],
        correctAnswer: 'You own it and can do whatever you want with it',
        explanation: 'Ownership rocks! Drive as much as you want, customize it, and once it\'s paid off, no more payments! It\'s yours. 🎯'
      },
      {
        id: 5,
        type: 'input',
        question: 'If a car costs $15,000 and you make a $3,000 down payment, how much do you still need to finance?',
        emoji: '🧮',
        correctAnswer: '12000',
        explanation: 'Great math! $15,000 - $3,000 = $12,000 to finance. A bigger down payment means a smaller loan and less interest! 💰'
      },
      {
        id: 6,
        type: 'mcq',
        question: 'For a first-time car buyer with limited budget, what\'s usually the best option?',
        emoji: '💡',
        options: [
          'Buy a reliable used car you can afford',
          'Lease a brand new luxury car',
          'Buy the most expensive car possible',
          'Don\'t buy a car at all'
        ],
        correctAnswer: 'Buy a reliable used car you can afford',
        explanation: 'Smart choice! A reliable used car saves money and gets you mobile. New cars lose value fast! Start practical, upgrade later. 🚗✨'
      }
    ]
  },

  // Moving Out
  'moving-out-1': {
    id: 'moving-out-1',
    title: 'Budgeting for Independence',
    emoji: '📊',
    money: 200,
    xp: 200,
    questions: [
      {
        id: 1,
        type: 'mcq',
        question: 'What is the 50/30/20 budget rule?',
        emoji: '📊',
        options: [
          '50% needs, 30% wants, 20% savings',
          '50% fun, 30% food, 20% rent',
          '50% savings, 30% needs, 20% wants',
          '50% shopping, 30% games, 20% other'
        ],
        correctAnswer: '50% needs, 30% wants, 20% savings',
        explanation: 'This popular rule helps you balance everything! 50% for must-haves (rent, food), 30% for fun stuff, 20% for savings and debt. 🎯'
      },
      {
        id: 2,
        type: 'mcq',
        question: 'Which of these is a "need" expense?',
        emoji: '🏠',
        options: [
          'Rent and groceries',
          'Netflix subscription',
          'New sneakers',
          'Concert tickets'
        ],
        correctAnswer: 'Rent and groceries',
        explanation: 'Needs are essentials you can\'t live without - housing, food, utilities, transportation to work. Wants are nice-to-haves! 💡'
      },
      {
        id: 3,
        type: 'input',
        question: 'If your monthly income is $2,000 and you follow the 50/30/20 rule, how much should you save each month?',
        emoji: '💰',
        correctAnswer: '400',
        explanation: 'Excellent! $2,000 × 20% = $400 for savings. This builds your emergency fund and helps you reach goals! 🌟'
      },
      {
        id: 4,
        type: 'mcq',
        question: 'What is an emergency fund?',
        emoji: '🆘',
        options: [
          'Money saved for unexpected expenses like car repairs or medical bills',
          'Money for buying treats',
          'Your rent money',
          'Money for vacations'
        ],
        correctAnswer: 'Money saved for unexpected expenses like car repairs or medical bills',
        explanation: 'An emergency fund is your safety net! It covers surprise expenses so you don\'t go into debt. Aim for 3-6 months of expenses! 🛡️'
      },
      {
        id: 5,
        type: 'mcq',
        question: 'What expenses do most people forget when moving out?',
        emoji: '💡',
        options: [
          'Utilities, internet, renter\'s insurance, and household supplies',
          'Only rent',
          'Just food',
          'Nothing - rent covers everything'
        ],
        correctAnswer: 'Utilities, internet, renter\'s insurance, and household supplies',
        explanation: 'The hidden costs add up! Electricity, water, internet, toilet paper, cleaning supplies - budget for EVERYTHING! 📝'
      },
      {
        id: 6,
        type: 'input',
        question: 'If rent is $1,200, utilities $150, and groceries $400, what are your monthly essential expenses?',
        emoji: '🧮',
        correctAnswer: '1750',
        explanation: 'Perfect budgeting! $1,200 + $150 + $400 = $1,750. And remember, this doesn\'t include wants like entertainment! Plan accordingly. 📊'
      }
    ]
  }
};