## ADDED Requirements

### Requirement: Category selection screen

The system SHALL display a category selection screen after nickname setup, allowing users to choose their learning mode.

#### Scenario: Display available learning categories
- **WHEN** a user completes nickname entry or returns to the application
- **THEN** the system displays three learning category options: Alphabet, Vocabulary, and Conversation
- **AND** each category is represented with a large, child-friendly button with icon

#### Scenario: User selects Alphabet category
- **WHEN** a user taps the Alphabet category button
- **THEN** the system navigates to the alphabet learning module
- **AND** the system starts with the first letter (A)

#### Scenario: User selects Vocabulary category
- **WHEN** a user taps the Vocabulary category button
- **THEN** the system displays vocabulary subcategory selection screen
- **AND** the system shows all five vocabulary categories (Food Ingredients, Cooking, Animals, Vehicles, Body Parts)

#### Scenario: User selects Conversation category
- **WHEN** a user taps the Conversation category button
- **THEN** the system navigates to the conversation learning module
- **AND** the system starts with the first conversation set

### Requirement: Vocabulary subcategory selection

The system SHALL provide subcategory selection for the vocabulary learning mode.

#### Scenario: Display vocabulary subcategories
- **WHEN** a user is on the vocabulary subcategory selection screen
- **THEN** the system displays five subcategory options: Food Ingredients, Cooking, Animals, Vehicles, Body Parts
- **AND** each subcategory is represented with a descriptive icon and label

#### Scenario: User selects a vocabulary subcategory
- **WHEN** a user taps a vocabulary subcategory button
- **THEN** the system navigates to the vocabulary learning module
- **AND** the system loads words from the selected subcategory

#### Scenario: Return to main category selection
- **WHEN** a user taps a back button on the vocabulary subcategory screen
- **THEN** the system returns to the main category selection screen

### Requirement: Navigation between learning items

The system SHALL provide navigation controls within each learning module.

#### Scenario: Next button availability
- **WHEN** a user is viewing a learning item (alphabet, word, or conversation)
- **THEN** the system displays a "Next" button
- **AND** the button is enabled after audio playback completes

#### Scenario: Navigate to next item
- **WHEN** a user taps the "Next" button
- **THEN** the system advances to the next learning item in the sequence
- **AND** the system automatically starts audio playback for the new item

#### Scenario: Last item in sequence
- **WHEN** a user reaches the last item in a learning sequence
- **THEN** the system displays a completion message
- **AND** the system provides an option to return to category selection or restart the sequence

### Requirement: Return to category selection

The system SHALL allow users to return to the category selection screen from any learning module.

#### Scenario: Home button available
- **WHEN** a user is in any learning module
- **THEN** the system displays a home icon or back button

#### Scenario: User returns to category selection
- **WHEN** a user taps the home button
- **THEN** the system navigates back to the category selection screen
- **AND** the system stops any playing audio
