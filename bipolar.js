        // Mobile Menu Toggle with Hamburger Animation
        const mobileMenuBtn = document.querySelector('.mobile-menu');
        const navLinks = document.querySelector('.nav-links');
        
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Prevent scrolling when menu is open
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Highlight current page in navigation
        const currentPage = window.location.pathname.split('/').pop();
        document.querySelectorAll('.nav-links a').forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });

        // FAQ Accordion
        const faqQuestions = document.querySelectorAll('.faq-question');
        
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                // Toggle active class on question
                question.classList.toggle('active');
                
                // Get the answer element
                const answer = question.nextElementSibling;
                
                // Toggle answer visibility
                if (question.classList.contains('active')) {
                    answer.style.display = 'block';
                } else {
                    answer.style.display = 'none';
                }
                
                // Close other open answers
                faqQuestions.forEach(otherQuestion => {
                    if (otherQuestion !== question && otherQuestion.classList.contains('active')) {
                        otherQuestion.classList.remove('active');
                        otherQuestion.nextElementSibling.style.display = 'none';
                    }
                });
            });
        });

        // Modal functionality for symptom/treatment cards
        const modal = document.getElementById('infoModal');
        const closeModalBtn = document.querySelector('.close-modal');
        const modalCloseBtn = document.getElementById('modalCloseBtn');
        
        // Modal content data
        const modalContent = {
            "bipolar1": {
                title: "Bipolar I Disorder",
                content: `
                    <p>Bipolar I Disorder is characterized by manic episodes that last at least 7 days, or by manic symptoms that are so severe that the person needs immediate hospital care. Depressive episodes occur as well, typically lasting at least 2 weeks.</p>
                    <p><strong>Key Features:</strong></p>
                    <ul>
                        <li>At least one manic episode (may have had depressive episodes too)</li>
                        <li>Manic episodes may include psychosis (losing touch with reality)</li>
                        <li>Significant impairment in work, social, or personal functioning</li>
                        <li>May require hospitalization to prevent harm to self or others</li>
                    </ul>
                    <p>Treatment for Bipolar I typically involves mood stabilizers, antipsychotic medications, and psychotherapy to help manage symptoms and prevent relapse.</p>
                `
            },
            "bipolar2": {
                title: "Bipolar II Disorder",
                content: `
                    <p>Bipolar II Disorder is defined by a pattern of depressive episodes and hypomanic episodes, but not the full-blown manic episodes that are typical of Bipolar I Disorder.</p>
                    <p><strong>Key Features:</strong></p>
                    <ul>
                        <li>At least one major depressive episode</li>
                        <li>At least one hypomanic episode (less severe than mania)</li>
                        <li>No history of manic episodes</li>
                        <li>Depressive episodes tend to be more frequent and longer-lasting</li>
                    </ul>
                    <p>While hypomanic episodes don't cause the marked impairment of manic episodes, they can still lead to unhealthy decisions and relationship difficulties. Treatment often includes mood stabilizers and therapy.</p>
                `
            },
            "cyclothymic": {
                title: "Cyclothymic Disorder",
                content: `
                    <p>Cyclothymic Disorder involves periods of hypomanic symptoms and periods of depressive symptoms lasting for at least 2 years in adults (1 year in children and adolescents). The symptoms don't meet the diagnostic requirements for hypomanic episodes and depressive episodes.</p>
                    <p><strong>Key Features:</strong></p>
                    <ul>
                        <li>Numerous periods of hypomanic and depressive symptoms</li>
                        <li>Symptoms don't meet full criteria for hypomanic or depressive episodes</li>
                        <li>Symptoms persist for at least half the time during a 2-year period</li>
                        <li>No symptom-free periods longer than 2 months</li>
                    </ul>
                    <p>While less severe than Bipolar I or II, Cyclothymic Disorder can still significantly impact quality of life. Treatment may include therapy and sometimes medication to stabilize moods.</p>
                `
            },
            "mania": {
                title: "Manic Episode Symptoms",
                content: `
                    <p>A manic episode is a period of abnormally elevated, expansive, or irritable mood and abnormally increased activity or energy that lasts at least one week (or less if hospitalization is required).</p>
                    <p><strong>Common Symptoms:</strong></p>
                    <ul>
                        <li>Inflated self-esteem or grandiosity</li>
                        <li>Decreased need for sleep (e.g., feeling rested after only 3 hours)</li>
                        <li>More talkative than usual or pressure to keep talking</li>
                        <li>Flight of ideas or racing thoughts</li>
                        <li>Distractibility</li>
                        <li>Increase in goal-directed activity or psychomotor agitation</li>
                        <li>Excessive involvement in activities with high potential for painful consequences</li>
                    </ul>
                    <p>During a manic episode, the mood disturbance is severe enough to cause marked impairment in social or occupational functioning or to necessitate hospitalization to prevent harm to self or others.</p>
                `
            },
            "euphoria": {
                title: "Euphoria in Bipolar Disorder",
                content: `
                    <p>Euphoria is an intense feeling of well-being, elation, or excitement that can occur during manic or hypomanic episodes in bipolar disorder.</p>
                    <p><strong>Characteristics:</strong></p>
                    <ul>
                        <li>Exaggerated sense of happiness or confidence</li>
                        <li>Feeling "on top of the world" or invincible</li>
                        <li>Unrealistic optimism about one's abilities</li>
                        <li>May alternate with irritability as the episode progresses</li>
                    </ul>
                    <p><strong>Important Notes:</strong></p>
                    <ul>
                        <li>Euphoria can lead to poor judgment and risky behaviors</li>
                        <li>It's often followed by a "crash" into depression</li>
                        <li>Many people don't recognize euphoria as problematic when experiencing it</li>
                        <li>Friends and family may notice the change before the person does</li>
                    </ul>
                `
            },
            "racing": {
                title: "Racing Thoughts in Bipolar Disorder",
                content: `
                    <p>Racing thoughts are a common symptom of manic or hypomanic episodes in bipolar disorder, characterized by a rapid flow of thoughts that are difficult to control.</p>
                    <p><strong>Characteristics:</strong></p>
                    <ul>
                        <li>Thoughts move quickly from one idea to another</li>
                        <li>Difficulty concentrating on one topic</li>
                        <li>May feel like your brain "won't shut off"</li>
                        <li>Often accompanied by rapid, pressured speech</li>
                        <li>May involve grandiose or unrealistic ideas</li>
                    </ul>
                    <p><strong>Impact:</strong></p>
                    <ul>
                        <li>Can interfere with sleep and daily functioning</li>
                        <li>May lead to impulsive decisions</li>
                        <li>Can be exhausting and overwhelming</li>
                        <li>May progress to disorganized thinking in severe cases</li>
                    </ul>
                    <p>Strategies like mindfulness meditation, journaling, and medication can help manage racing thoughts.</p>
                `
            },
            "risk": {
                title: "Risky Behavior in Bipolar Disorder",
                content: `
                    <p>During manic or hypomanic episodes, people with bipolar disorder often engage in risky behaviors that they wouldn't normally consider.</p>
                    <p><strong>Common Risky Behaviors:</strong></p>
                    <ul>
                        <li>Excessive spending sprees or financial irresponsibility</li>
                        <li>Reckless driving or other dangerous activities</li>
                        <li>Substance abuse</li>
                        <li>Unprotected sex with multiple partners</li>
                        <li>Quitting jobs suddenly</li>
                        <li>Making unrealistic business investments</li>
                        <li>Aggressive or confrontational behavior</li>
                    </ul>
                    <p><strong>Why It Happens:</strong></p>
                    <ul>
                        <li>Impaired judgment during manic episodes</li>
                        <li>Feeling invincible or overly confident</li>
                        <li>Desire for immediate gratification</li>
                        <li>Underestimating consequences</li>
                    </ul>
                    <p>These behaviors can have serious consequences, which is why early treatment and prevention of manic episodes is crucial.</p>
                `
            },
            "depressed": {
                title: "Depressive Episodes in Bipolar Disorder",
                content: `
                    <p>Depressive episodes in bipolar disorder involve periods of intense sadness, hopelessness, and loss of interest in activities.</p>
                    <p><strong>Common Symptoms:</strong></p>
                    <ul>
                        <li>Persistent sad, anxious, or "empty" mood</li>
                        <li>Feelings of hopelessness or pessimism</li>
                        <li>Irritability</li>
                        <li>Feelings of guilt, worthlessness, or helplessness</li>
                        <li>Loss of interest or pleasure in hobbies and activities</li>
                        <li>Decreased energy or fatigue</li>
                        <li>Difficulty concentrating, remembering, or making decisions</li>
                        <li>Changes in appetite or weight</li>
                        <li>Thoughts of death or suicide, or suicide attempts</li>
                    </ul>
                    <p>Bipolar depression can be particularly severe and may require different treatment approaches than unipolar depression.</p>
                `
            },
            "fatigue": {
                title: "Fatigue in Bipolar Disorder",
                content: `
                    <p>Fatigue is a common symptom during depressive episodes in bipolar disorder, characterized by extreme tiredness and lack of energy.</p>
                    <p><strong>Characteristics:</strong></p>
                    <ul>
                        <li>Persistent tiredness that isn't relieved by sleep</li>
                        <li>Physical and mental exhaustion</li>
                        <li>Difficulty starting or completing tasks</li>
                        <li>May alternate with periods of high energy during manic phases</li>
                    </ul>
                    <p><strong>Potential Causes:</strong></p>
                    <ul>
                        <li>Neurochemical imbalances in the brain</li>
                        <li>Disrupted sleep patterns</li>
                        <li>Side effects of medications</li>
                        <li>Physical effects of mood episodes</li>
                    </ul>
                    <p><strong>Management Strategies:</strong></p>
                    <ul>
                        <li>Maintaining a regular sleep schedule</li>
                        <li>Gentle exercise when possible</li>
                        <li>Balanced nutrition</li>
                        <li>Pacing activities throughout the day</li>
                        <li>Working with your doctor to adjust medications if needed</li>
                    </ul>
                `
            },
            "concentration": {
                title: "Concentration Issues in Bipolar Disorder",
                content: `
                    <p>Difficulty with concentration, focus, and memory is common during both depressive and manic episodes in bipolar disorder.</p>
                    <p><strong>During Depressive Episodes:</strong></p>
                    <ul>
                        <li>Slowed thinking and difficulty processing information</li>
                        <li>Trouble making decisions</li>
                        <li>Forgetfulness</li>
                        <li>Difficulty focusing on tasks</li>
                    </ul>
                    <p><strong>During Manic Episodes:</strong></p>
                    <ul>
                        <li>Racing thoughts make it hard to focus</li>
                        <li>Easily distracted by irrelevant stimuli</li>
                        <li>Jumping quickly between topics</li>
                        <li>May start many projects but finish few</li>
                    </ul>
                    <p><strong>Management Tips:</strong></p>
                    <ul>
                        <li>Break tasks into smaller steps</li>
                        <li>Use lists, calendars, and reminders</li>
                        <li>Minimize distractions when possible</li>
                        <li>Practice mindfulness techniques</li>
                        <li>Discuss cognitive symptoms with your treatment provider</li>
                    </ul>
                `
            },
            "suicidal": {
                title: "Suicidal Thoughts in Bipolar Disorder",
                content: `
                    <p>People with bipolar disorder are at higher risk for suicidal thoughts and behaviors, particularly during depressive or mixed episodes.</p>
                    <p><strong>Warning Signs:</strong></p>
                    <ul>
                        <li>Talking about wanting to die or kill oneself</li>
                        <li>Looking for ways to kill oneself</li>
                        <li>Talking about feeling hopeless or having no reason to live</li>
                        <li>Talking about being a burden to others</li>
                        <li>Increasing use of alcohol or drugs</li>
                        <li>Acting anxious, agitated, or reckless</li>
                        <li>Sleeping too little or too much</li>
                        <li>Withdrawing or feeling isolated</li>
                        <li>Showing rage or talking about seeking revenge</li>
                        <li>Displaying extreme mood swings</li>
                    </ul>
                    <p><strong>If You're in Crisis:</strong></p>
                    <ul>
                        <li>Call emergency services or go to the nearest emergency room</li>
                        <li>Contact a crisis hotline</li>
                        <li>Reach out to your therapist or psychiatrist immediately</li>
                        <li>Stay with a trusted friend or family member</li>
                    </ul>
                    <p>With proper treatment and support, suicidal thoughts can be managed and reduced.</p>
                `
            },
            "medication": {
                title: "Medication for Bipolar Disorder",
                content: `
                    <p>Medication is often a cornerstone of bipolar disorder treatment, helping to stabilize mood swings and prevent episodes.</p>
                    <p><strong>Common Medications:</strong></p>
                    <ul>
                        <li><strong>Mood stabilizers:</strong> Lithium, valproate, lamotrigine</li>
                        <li><strong>Atypical antipsychotics:</strong> Quetiapine, olanzapine, risperidone</li>
                        <li><strong>Antidepressants:</strong> Sometimes used cautiously with mood stabilizers</li>
                        <li><strong>Anti-anxiety medications:</strong> For short-term use during acute episodes</li>
                    </ul>
                    <p><strong>Important Considerations:</strong></p>
                    <ul>
                        <li>Finding the right medication(s) may take time</li>
                        <li>Medications work best when combined with therapy</li>
                        <li>Side effects vary and should be discussed with your doctor</li>
                        <li>Never stop medication abruptly without medical supervision</li>
                        <li>Regular blood tests may be needed for some medications</li>
                    </ul>
                    <p>Work closely with your psychiatrist to find the most effective medication regimen with the fewest side effects.</p>
                `
            },
            "therapy": {
                title: "Therapy for Bipolar Disorder",
                content: `
                    <p>Psychotherapy is an essential part of bipolar disorder treatment, helping individuals manage symptoms and prevent relapse.</p>
                    <p><strong>Effective Therapy Approaches:</strong></p>
                    <ul>
                        <li><strong>Cognitive Behavioral Therapy (CBT):</strong> Helps identify and change negative thought patterns and behaviors</li>
                        <li><strong>Psychoeducation:</strong> Teaches about bipolar disorder and its management</li>
                        <li><strong>Family-Focused Therapy:</strong> Involves family members in treatment</li>
                        <li><strong>Interpersonal and Social Rhythm Therapy:</strong> Helps stabilize daily rhythms and improve relationships</li>
                        <li><strong>Dialectical Behavior Therapy (DBT):</strong> Helps manage intense emotions</li>
                    </ul>
                    <p><strong>Therapy Can Help With:</strong></p>
                    <ul>
                        <li>Recognizing early warning signs of mood episodes</li>
                        <li>Developing coping strategies</li>
                        <li>Improving medication adherence</li>
                        <li>Managing stress and maintaining routines</li>
                        <li>Addressing relationship and work challenges</li>
                        <li>Dealing with the psychological impact of the disorder</li>
                    </ul>
                    <p>Consistent therapy can significantly improve quality of life for people with bipolar disorder.</p>
                `
            },
            "routine": {
                title: "Lifestyle Routine for Bipolar Disorder",
                content: `
                    <p>Maintaining a stable daily routine is crucial for managing bipolar disorder and preventing mood episodes.</p>
                    <p><strong>Key Components of a Healthy Routine:</strong></p>
                    <ul>
                        <li><strong>Regular sleep schedule:</strong> Go to bed and wake up at the same time every day</li>
                        <li><strong>Balanced meals:</strong> Eat nutritious food at regular times</li>
                        <li><strong>Daily activity:</strong> Include moderate exercise and social interaction</li>
                        <li><strong>Stress management:</strong> Practice relaxation techniques</li>
                        <li><strong>Medication routine:</strong> Take medications at the same times each day</li>
                        <li><strong>Mood tracking:</strong> Monitor symptoms and triggers</li>
                    </ul>
                    <p><strong>Why Routine Matters:</strong></p>
                    <ul>
                        <li>Helps regulate circadian rhythms that affect mood</li>
                        <li>Reduces stress that can trigger episodes</li>
                        <li>Provides structure during depressive episodes</li>
                        <li>Helps maintain stability between therapy sessions</li>
                    </ul>
                    <p>Even small steps toward a regular routine can make a significant difference in symptom management.</p>
                `
            },
            "support": {
                title: "Support Groups for Bipolar Disorder",
                content: `
                    <p>Support groups provide valuable peer support for individuals with bipolar disorder and their loved ones.</p>
                    <p><strong>Benefits of Support Groups:</strong></p>
                    <ul>
                        <li>Reduces feelings of isolation</li>
                        <li>Provides practical coping strategies</li>
                        <li>Offers hope through others' success stories</li>
                        <li>Creates a safe space to share experiences</li>
                        <li>Helps recognize early warning signs through others' observations</li>
                    </ul>
                    <p><strong>Types of Support Groups:</strong></p>
                    <ul>
                        <li><strong>Peer-led groups:</strong> Run by individuals with lived experience</li>
                        <li><strong>Professional-facilitated groups:</strong> Led by mental health professionals</li>
                        <li><strong>Online communities:</strong> For those who prefer digital connection</li>
                        <li><strong>Family support groups:</strong> For loved ones of those with bipolar disorder</li>
                    </ul>
                    <p><strong>Finding a Group:</strong></p>
                    <ul>
                        <li>Ask your treatment provider for recommendations</li>
                        <li>Check with local mental health organizations</li>
                        <li>Search reputable online directories</li>
                        <li>Consider trying a few groups to find the best fit</li>
                    </ul>
                    <p>Support groups complement but don't replace professional treatment.</p>
                `
            },
            "hospital": {
                title: "Hospitalization for Bipolar Disorder",
                content: `
                    <p>Hospitalization may be necessary during severe manic, depressive, or mixed episodes of bipolar disorder.</p>
                    <p><strong>When Hospitalization May Be Needed:</strong></p>
                    <ul>
                        <li>Risk of harm to self or others</li>
                        <li>Severe psychotic symptoms (delusions or hallucinations)</li>
                        <li>Inability to care for basic needs</li>
                        <li>Treatment-resistant symptoms requiring intensive care</li>
                        <li>Need for medication adjustment under close supervision</li>
                    </ul>
                    <p><strong>What to Expect:</strong></p>
                    <ul>
                        <li>Comprehensive psychiatric evaluation</li>
                        <li>Medication stabilization</li>
                        <li>Individual and group therapy</li>
                        <li>Structured daily activities</li>
                        <li>Discharge planning for continued care</li>
                    </ul>
                    <p><strong>Types of Hospital Care:</strong></p>
                    <ul>
                        <li><strong>Inpatient hospitalization:</strong> 24-hour care in a psychiatric unit</li>
                        <li><strong>Partial hospitalization:</strong> Day programs with return home at night</li>
                        <li><strong>Residential treatment:</strong> Longer-term structured care</li>
                    </ul>
                    <p>Hospitalization can provide safety and stabilization during acute episodes, allowing for transition back to outpatient care.</p>
                `
            }
        };

        // Add click event listeners to all cards with data-modal attributes
        document.querySelectorAll('[data-modal]').forEach(card => {
            card.addEventListener('click', function() {
                const modalId = this.getAttribute('data-modal');
                const content = modalContent[modalId];
                
                if (content) {
                    document.getElementById('modalTitle').textContent = content.title;
                    document.getElementById('modalBody').innerHTML = content.content;
                    modal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        // Close modal when clicking close button
        closeModalBtn.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        });

        // Close modal when clicking close button in footer
        modalCloseBtn.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        });

        // Close modal when clicking outside
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
