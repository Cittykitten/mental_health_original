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

        // Breathing Exercise Animation
        const breathingCircle = document.getElementById('breathingCircle');
        let isBreathing = false;
        let breathCycle = 0;
        
        breathingCircle.addEventListener('click', function() {
            if (!isBreathing) {
                isBreathing = true;
                startBreathingExercise();
            }
        });
        
        function startBreathingExercise() {
            // Inhale (4 seconds)
            breathingCircle.textContent = "Breathe In";
            breathingCircle.style.transform = "scale(1.5)";
            breathingCircle.style.backgroundColor = "#3a7ca5";
            
            setTimeout(() => {
                // Hold (7 seconds)
                breathingCircle.textContent = "Hold";
                breathingCircle.style.transform = "scale(1.2)";
                breathingCircle.style.backgroundColor = "#2aa8a8";
                
                setTimeout(() => {
                    // Exhale (8 seconds)
                    breathingCircle.textContent = "Breathe Out";
                    breathingCircle.style.transform = "scale(1)";
                    breathingCircle.style.backgroundColor = "#1d8181";
                    
                    setTimeout(() => {
                        breathCycle++;
                        if (breathCycle < 4) {
                            startBreathingExercise();
                        } else {
                            // Reset after 4 cycles
                            breathingCircle.textContent = "Complete!";
                            setTimeout(() => {
                                breathingCircle.textContent = "Breathe";
                                breathingCircle.style.transform = "scale(1)";
                                breathingCircle.style.backgroundColor = "#2aa8a8";
                                isBreathing = false;
                                breathCycle = 0;
                            }, 2000);
                        }
                    }, 8000);
                }, 7000);
            }, 4000);
        }

        // Modal functionality for symptom/treatment cards
        const modal = document.getElementById('infoModal');
        const closeModalBtn = document.querySelector('.close-modal');
        const modalCloseBtn = document.getElementById('modalCloseBtn');
        
        // Modal content data
        const modalContent = {
            "gad": {
                title: "Generalized Anxiety Disorder (GAD)",
                content: `
                    <p>Generalized Anxiety Disorder involves persistent and excessive worry about various aspects of life, such as work, health, or family, even when there's little or no reason to worry.</p>
                    <p><strong>Key Features:</strong></p>
                    <ul>
                        <li>Excessive anxiety occurring more days than not for at least 6 months</li>
                        <li>Difficulty controlling the worry</li>
                        <li>Anxiety associated with restlessness, fatigue, difficulty concentrating, irritability, muscle tension, or sleep disturbance</li>
                        <li>The anxiety causes significant distress or impairment in functioning</li>
                    </ul>
                    <p>People with GAD often anticipate disaster and are overly concerned about everyday matters. Unlike phobias where fear is connected to a specific thing, GAD anxiety is diffuse and general.</p>
                `
            },
            "panic": {
                title: "Panic Disorder",
                content: `
                    <p>Panic disorder involves recurrent unexpected panic attacks along with fear of future attacks and/or maladaptive changes in behavior related to the attacks.</p>
                    <p><strong>Key Features:</strong></p>
                    <ul>
                        <li>Recurrent unexpected panic attacks</li>
                        <li>At least one attack has been followed by 1 month or more of persistent concern about additional attacks or maladaptive behavior changes</li>
                        <li>Panic attacks aren't due to substance use or another medical condition</li>
                    </ul>
                    <p><strong>Panic Attack Symptoms:</strong></p>
                    <ul>
                        <li>Palpitations or accelerated heart rate</li>
                        <li>Sweating, trembling or shaking</li>
                        <li>Sensations of shortness of breath</li>
                        <li>Feelings of choking, chest pain</li>
                        <li>Nausea or abdominal distress</li>
                        <li>Dizziness or lightheadedness</li>
                        <li>Fear of losing control or "going crazy"</li>
                        <li>Fear of dying</li>
                    </ul>
                `
            },
            "social": {
                title: "Social Anxiety Disorder",
                content: `
                    <p>Social Anxiety Disorder (social phobia) involves intense fear of social situations where one might be scrutinized or judged by others.</p>
                    <p><strong>Key Features:</strong></p>
                    <ul>
                        <li>Marked fear or anxiety about social situations where the individual is exposed to possible scrutiny</li>
                        <li>Fear of acting in a way that will be negatively evaluated</li>
                        <li>Social situations almost always provoke fear or anxiety</li>
                        <li>Social situations are avoided or endured with intense fear</li>
                        <li>The fear is out of proportion to the actual threat</li>
                        <li>The fear persists for 6 months or more</li>
                    </ul>
                    <p>Common feared situations include public speaking, meeting new people, eating in front of others, or using public restrooms. Physical symptoms often include blushing, sweating, trembling, nausea, or difficulty speaking.</p>
                `
            },
            "phobias": {
                title: "Specific Phobias",
                content: `
                    <p>A specific phobia is an intense, irrational fear of a specific object or situation that poses little or no actual danger.</p>
                    <p><strong>Common Types:</strong></p>
                    <ul>
                        <li><strong>Animal:</strong> Spiders, snakes, dogs</li>
                        <li><strong>Natural Environment:</strong> Heights, storms, water</li>
                        <li><strong>Blood-Injection-Injury:</strong> Needles, medical procedures</li>
                        <li><strong>Situational:</strong> Flying, elevators, enclosed spaces</li>
                        <li><strong>Other:</strong> Choking, vomiting, loud sounds</li>
                    </ul>
                    <p><strong>Key Features:</strong></p>
                    <ul>
                        <li>Marked fear or anxiety about a specific object or situation</li>
                        <li>The phobic object/situation almost always provokes immediate fear</li>
                        <li>The object/situation is actively avoided or endured with intense fear</li>
                        <li>The fear is out of proportion to the actual danger</li>
                        <li>The fear persists for 6 months or more</li>
                    </ul>
                `
            },
            "agoraphobia": {
                title: "Agoraphobia",
                content: `
                    <p>Agoraphobia involves fear and avoidance of situations where escape might be difficult or help unavailable if panic-like symptoms occur.</p>
                    <p><strong>Common Feared Situations:</strong></p>
                    <ul>
                        <li>Using public transportation</li>
                        <li>Being in open spaces (parking lots, bridges)</li>
                        <li>Being in enclosed places (shops, theaters)</li>
                        <li>Standing in line or being in a crowd</li>
                        <li>Being outside the home alone</li>
                    </ul>
                    <p><strong>Key Features:</strong></p>
                    <ul>
                        <li>Fear or anxiety about two or more of these situations</li>
                        <li>Fear of being unable to escape or get help if panic-like symptoms develop</li>
                        <li>Situations almost always provoke fear/anxiety</li>
                        <li>Situations are avoided or require a companion</li>
                        <li>The fear is out of proportion to the actual danger</li>
                        <li>The fear persists for 6 months or more</li>
                    </ul>
                `
            },
            "ocd": {
                title: "Obsessive-Compulsive Disorder (OCD)",
                content: `
                    <p>OCD involves unwanted recurring thoughts (obsessions) and/or repetitive behaviors (compulsions) performed to reduce anxiety.</p>
                    <p><strong>Common Obsessions:</strong></p>
                    <ul>
                        <li>Fear of contamination</li>
                        <li>Unwanted forbidden thoughts (aggressive, sexual, religious)</li>
                        <li>Need for symmetry or exactness</li>
                        <li>Fear of losing or discarding something important</li>
                    </ul>
                    <p><strong>Common Compulsions:</strong></p>
                    <ul>
                        <li>Excessive cleaning or handwashing</li>
                        <li>Ordering and arranging things in a particular way</li>
                        <li>Repeatedly checking on things</li>
                        <li>Compulsive counting</li>
                    </ul>
                    <p><strong>Key Features:</strong></p>
                    <ul>
                        <li>Presence of obsessions, compulsions, or both</li>
                        <li>The obsessions/compulsions are time-consuming or cause distress/impairment</li>
                        <li>The symptoms aren't due to substance use or another medical condition</li>
                    </ul>
                `
            },
            "ptsd": {
                title: "Post-Traumatic Stress Disorder (PTSD)",
                content: `
                    <p>PTSD can develop after exposure to actual or threatened death, serious injury, or sexual violence.</p>
                    <p><strong>Key Symptoms:</strong></p>
                    <ul>
                        <li><strong>Intrusive symptoms:</strong> Memories, nightmares, flashbacks</li>
                        <li><strong>Avoidance:</strong> Of trauma-related thoughts, feelings, or reminders</li>
                        <li><strong>Negative changes in thinking/mood:</strong> Negative beliefs, distorted blame, negative emotions</li>
                        <li><strong>Changes in arousal/reactivity:</strong> Irritability, reckless behavior, hypervigilance</li>
                    </ul>
                    <p><strong>Additional Features:</strong></p>
                    <ul>
                        <li>Symptoms last more than 1 month</li>
                        <li>Cause significant distress or impairment</li>
                        <li>Not due to substance use or another medical condition</li>
                    </ul>
                    <p>PTSD symptoms may begin within 3 months of the trauma, but sometimes emerge years later. Effective treatments include trauma-focused psychotherapy and medication.</p>
                `
            },
            "emotional": {
                title: "Emotional Symptoms of Anxiety",
                content: `
                    <p>Anxiety affects not just the body but also emotions, thoughts, and overall mental state.</p>
                    <p><strong>Common Emotional Symptoms:</strong></p>
                    <ul>
                        <li>Excessive worry that's difficult to control</li>
                        <li>Feelings of apprehension or dread</li>
                        <li>Trouble concentrating or mind going blank</li>
                        <li>Irritability</li>
                        <li>Feeling tense, nervous, or restless</li>
                        <li>Anticipating the worst outcome</li>
                        <li>Feeling like your mind's racing</li>
                        <li>Feeling unreal or detached (derealization/depersonalization)</li>
                    </ul>
                    <p>These emotional symptoms can range from mild unease to intense terror, depending on the type and severity of anxiety. They often lead to avoidance behaviors as people try to minimize uncomfortable feelings.</p>
                `
            },
            "physical": {
                title: "Physical Symptoms of Anxiety",
                content: `
                    <p>Anxiety triggers the body's fight-or-flight response, leading to numerous physical symptoms.</p>
                    <p><strong>Common Physical Symptoms:</strong></p>
                    <ul>
                        <li>Pounding or racing heart</li>
                        <li>Sweating, trembling or shaking</li>
                        <li>Shortness of breath or feeling smothered</li>
                        <li>Chest pain or discomfort</li>
                        <li>Nausea or abdominal distress</li>
                        <li>Dizziness or lightheadedness</li>
                        <li>Chills or hot flashes</li>
                        <li>Numbness or tingling sensations</li>
                        <li>Muscle tension or aches</li>
                        <li>Fatigue</li>
                        <li>Difficulty sleeping</li>
                    </ul>
                    <p>These symptoms occur because anxiety prepares the body to deal with perceived danger by releasing adrenaline and other stress hormones. While uncomfortable, they're not dangerous.</p>
                `
            },
            "panic-attack": {
                title: "Panic Attack Symptoms",
                content: `
                    <p>A panic attack is a sudden episode of intense fear that triggers severe physical reactions when there's no real danger.</p>
                    <p><strong>Key Symptoms:</strong></p>
                    <ul>
                        <li>Palpitations, pounding heart, or accelerated heart rate</li>
                        <li>Sweating</li>
                        <li>Trembling or shaking</li>
                        <li>Sensations of shortness of breath or smothering</li>
                        <li>Feelings of choking</li>
                        <li>Chest pain or discomfort</li>
                        <li>Nausea or abdominal distress</li>
                        <li>Feeling dizzy, unsteady, lightheaded, or faint</li>
                        <li>Chills or heat sensations</li>
                        <li>Paresthesias (numbness or tingling sensations)</li>
                        <li>Derealization (feelings of unreality) or depersonalization (being detached from oneself)</li>
                        <li>Fear of losing control or "going crazy"</li>
                        <li>Fear of dying</li>
                    </ul>
                    <p>Panic attacks typically peak within minutes and are often accompanied by a sense of impending doom or urgent need to escape. They can occur unexpectedly or in response to a trigger.</p>
                `
            },
            "avoidance": {
                title: "Avoidance Behaviors in Anxiety",
                content: `
                    <p>Avoidance is a common but problematic coping mechanism in anxiety disorders where people steer clear of situations that trigger anxiety.</p>
                    <p><strong>Common Forms of Avoidance:</strong></p>
                    <ul>
                        <li><strong>Situational avoidance:</strong> Avoiding places or activities (e.g., not driving due to panic attacks)</li>
                        <li><strong>Cognitive avoidance:</strong> Avoiding thinking about anxiety-provoking topics</li>
                        <li><strong>Protective behaviors:</strong> Carrying medication "just in case" or needing a safety person</li>
                        <li><strong>Subtle avoidance:</strong> Distracting oneself or leaving situations early</li>
                    </ul>
                    <p><strong>Why Avoidance is Problematic:</strong></p>
                    <ul>
                        <li>Provides short-term relief but maintains anxiety long-term</li>
                        <li>Limits life experiences and opportunities</li>
                        <li>Can lead to increased isolation</li>
                        <li>May result in loss of independence</li>
                    </ul>
                    <p>Treatment often involves gradual exposure to feared situations to reduce avoidance and build confidence.</p>
                `
            },
            "therapy": {
                title: "Therapy for Anxiety",
                content: `
                    <p>Psychotherapy is highly effective for treating anxiety disorders, with Cognitive Behavioral Therapy (CBT) being the gold standard.</p>
                    <p><strong>Effective Therapy Approaches:</strong></p>
                    <ul>
                        <li><strong>Cognitive Behavioral Therapy (CBT):</strong> Identifies and changes negative thought patterns and behaviors</li>
                        <li><strong>Exposure Therapy:</strong> Gradual, controlled exposure to feared situations</li>
                        <li><strong>Acceptance and Commitment Therapy (ACT):</strong> Focuses on accepting anxious feelings while committing to valued actions</li>
                        <li><strong>Dialectical Behavior Therapy (DBT):</strong> Helps regulate intense emotions</li>
                        <li><strong>Mindfulness-Based Therapies:</strong> Teach present-moment awareness</li>
                    </ul>
                    <p><strong>What to Expect in Therapy:</strong></p>
                    <ul>
                        <li>Learning about how anxiety works</li>
                        <li>Identifying triggers and early warning signs</li>
                        <li>Developing coping strategies</li>
                        <li>Challenging irrational fears</li>
                        <li>Gradual exposure to feared situations</li>
                        <li>Relapse prevention planning</li>
                    </ul>
                    <p>Many people see improvement within 12-20 sessions, though this varies by individual and anxiety type.</p>
                `
            },
            "medication": {
                title: "Medication for Anxiety",
                content: `
                    <p>Medication can be an effective part of anxiety treatment, especially for moderate to severe symptoms.</p>
                    <p><strong>Common Medications:</strong></p>
                    <ul>
                        <li><strong>SSRIs (Selective Serotonin Reuptake Inhibitors):</strong> First-line treatment (e.g., sertraline, escitalopram)</li>
                        <li><strong>SNRIs (Serotonin-Norepinephrine Reuptake Inhibitors):</strong> Also first-line (e.g., venlafaxine, duloxetine)</li>
                        <li><strong>Benzodiazepines:</strong> For short-term relief (e.g., lorazepam, clonazepam)</li>
                        <li><strong>Buspirone:</strong> For generalized anxiety</li>
                        <li><strong>Beta-blockers:</strong> For performance anxiety (e.g., propranolol)</li>
                    </ul>
                    <p><strong>Important Considerations:</strong></p>
                    <ul>
                        <li>Medications may take 4-6 weeks to reach full effect</li>
                        <li>Side effects are usually temporary</li>
                        <li>Never stop medication abruptly without medical supervision</li>
                        <li>Medication works best combined with therapy</li>
                        <li>Regular follow-ups with your prescriber are important</li>
                    </ul>
                    <p>Work with your doctor to find the medication that's most effective with the fewest side effects for you.</p>
                `
            },
            "lifestyle": {
                title: "Lifestyle Changes for Anxiety",
                content: `
                    <p>Certain lifestyle modifications can significantly reduce anxiety symptoms and improve overall mental health.</p>
                    <p><strong>Effective Lifestyle Changes:</strong></p>
                    <ul>
                        <li><strong>Regular exercise:</strong> 30 minutes most days can reduce anxiety</li>
                        <li><strong>Healthy diet:</strong> Limit caffeine, alcohol, and processed foods</li>
                        <li><strong>Adequate sleep:</strong> 7-9 hours per night helps regulate mood</li>
                        <li><strong>Stress management:</strong> Incorporate relaxation techniques</li>
                        <li><strong>Time in nature:</strong> Can lower stress hormones</li>
                        <li><strong>Social connection:</strong> Maintain supportive relationships</li>
                        <li><strong>Limit screen time:</strong> Especially before bed</li>
                        <li><strong>Routine:</strong> Regular daily structure provides stability</li>
                    </ul>
                    <p><strong>Additional Helpful Practices:</strong></p>
                    <ul>
                        <li>Journaling to process thoughts and emotions</li>
                        <li>Practicing gratitude daily</li>
                        <li>Setting healthy boundaries</li>
                        <li>Learning to say no to excessive commitments</li>
                        <li>Scheduling worry time to contain anxious thoughts</li>
                    </ul>
                    <p>While lifestyle changes alone may not eliminate anxiety disorders, they can significantly reduce symptoms and improve treatment effectiveness.</p>
                `
            },
            "mindfulness": {
                title: "Mindfulness for Anxiety",
                content: `
                    <p>Mindfulness practices help reduce anxiety by cultivating present-moment awareness and acceptance.</p>
                    <p><strong>Benefits of Mindfulness:</strong></p>
                    <ul>
                        <li>Reduces rumination (dwelling on negative thoughts)</li>
                        <li>Decreases emotional reactivity</li>
                        <li>Increases ability to manage stress</li>
                        <li>Improves focus and concentration</li>
                        <li>Enhances self-awareness</li>
                    </ul>
                    <p><strong>Mindfulness Techniques:</strong></p>
                    <ul>
                        <li><strong>Breathing exercises:</strong> Focusing on the breath to anchor in the present</li>
                        <li><strong>Body scans:</strong> Noticing physical sensations without judgment</li>
                        <li><strong>Mindful observation:</strong> Focusing fully on sensory experiences</li>
                        <li><strong>Loving-kindness meditation:</strong> Cultivating compassion</li>
                        <li><strong>Mindful movement:</strong> Yoga, tai chi, or walking meditation</li>
                    </ul>
                    <p><strong>How to Practice:</strong></p>
                    <ul>
                        <li>Start with just 5-10 minutes daily</li>
                        <li>Use apps or guided meditations if helpful</li>
                        <li>Practice noticing when your mind wanders and gently return focus</li>
                        <li>Apply mindfulness to daily activities (eating, showering)</li>
                        <li>Be patient - benefits accumulate with regular practice</li>
                    </ul>
                    <p>Research shows mindfulness can change brain regions associated with anxiety and emotional regulation.</p>
                `
            },
            "support": {
                title: "Support Groups for Anxiety",
                content: `
                    <p>Support groups provide valuable opportunities to connect with others facing similar challenges with anxiety.</p>
                    <p><strong>Benefits of Support Groups:</strong></p>
                    <ul>
                        <li>Reduces feelings of isolation</li>
                        <li>Provides practical coping strategies</li>
                        <li>Offers hope through others' success stories</li>
                        <li>Creates a safe space to share experiences</li>
                        <li>Normalizes anxiety experiences</li>
                    </ul>
                    <p><strong>Types of Support Groups:</strong></p>
                    <ul>
                        <li><strong>In-person groups:</strong> Often organized by mental health organizations</li>
                        <li><strong>Online communities:</strong> For those who prefer digital connection</li>
                        <li><strong>Condition-specific groups:</strong> Focused on particular anxiety disorders</li>
                        <li><strong>Peer-led vs. professional-facilitated:</strong> Different formats available</li>
                    </ul>
                    <p><strong>Finding a Group:</strong></p>
                    <ul>
                        <li>Ask your therapist or doctor for recommendations</li>
                        <li>Check with local mental health clinics</li>
                        <li>Search reputable online directories</li>
                        <li>Consider trying a few groups to find the best fit</li>
                    </ul>
                    <p>While helpful, support groups complement but don't replace professional treatment for anxiety disorders.</p>
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
