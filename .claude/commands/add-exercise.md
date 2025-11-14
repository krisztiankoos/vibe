Add a new exercise type to the lesson builder.

Exercise type: $ARGUMENTS

Steps to implement:

1. **Update Type Definitions** (src/types.ts):
   - Add new exercise type to Exercise discriminated union
   - Define interface with required fields

2. **Create Builder Form** (src/components/ExerciseBuilder.tsx):
   - Add case in exercise type selector
   - Create form fields for exercise properties
   - Include validation

3. **Implement Student View** (src/components/StudentExercise.tsx):
   - Add rendering case for new type
   - Implement interactive elements
   - Add answer validation if applicable
   - Include progress tracking

4. **Add Translations** (src/translations.ts):
   - Exercise type name (en/uk)
   - All form labels and placeholders
   - Student-facing instructions
   - Error messages

5. **Add Help Text** (src/utils/helpText.ts):
   - Description of exercise type
   - When to use it
   - Example content
   - Best practices

6. **Test**:
   - Teacher can create exercise
   - Exercise saves correctly
   - Student view renders properly
   - Both languages work
   - Import/export preserves data

Follow existing patterns for gap-fill, multiple-choice, etc. as reference.
