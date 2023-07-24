import { defineStore } from 'pinia'
import { getMedications } from '~/lib/endpoints'

export const useMedicationStore = defineStore('medication', () => {
  const medicationData = ref()

  // GETTERS ****************************************************************
  async function getMedicationsFromGraphQL() {
    try {
      const response = await getMedications()
      const mappedData = response.medications.map((medication: any) => {
        const frontendMedication = {
          medicationId: medication.medicationId,
          medicationName: medication.name,
          medicationInstructions: medication.instructions,
          medicationSpecialInstructions: medication.specialInstructions,
          medicationRefills: medication.refills,
          medicationRefillExpirationInDays: medication.refillsExpirationRate,
        }
        return frontendMedication
      })
      medicationData.value = mappedData
    } catch (err) {
      console.log(err)
    }
  }

  // const medicationData = [
  //   {
  //     medicationId: '1bcb2db6-4e1c-4e5b-8299-57c51538b693',
  //     medicationName: 'Absorica Micronized, 16mg, 60 capsules',
  //     medicationInstructions: 'Morning, Evening',
  //     medicationSpecialInstructions: 'Take one in the morning and one at night',
  //     medicationRefills: '',
  //     medicationRefillExpirationInDays: '',
  //   },
  //   {
  //     medicationId: '2568905b-39e0-4811-a3db-1f8f21565b7b',
  //     medicationName: 'Absorica Micronized, 20mg, 60 capsules',
  //     medicationInstructions: 'Morning, Evening',
  //     medicationSpecialInstructions: 'Take one in the morning and one at night',
  //     medicationRefills: '1',
  //     medicationRefillExpirationInDays: '45',
  //   },
  //   {
  //     medicationId: 'c24899d6-7315-4183-8d84-fb79a1cc667b',
  //     medicationName: 'Absorica Micronized, 20mg, 90 capsules',
  //     medicationInstructions: 'Morning, Evening',
  //     medicationSpecialInstructions: 'Take one in the morning and one at night',
  //     medicationRefills: '1',
  //     medicationRefillExpirationInDays: '45',
  //   },
  //   {
  //     medicationId: '2d67f9b9-9e21-4675-8744-7f9e085f9ff7',
  //     medicationName: 'Retin-A Micro, 0.06%',
  //     medicationInstructions: 'Evening',
  //     medicationSpecialInstructions: 'Apply to face before bed',
  //     medicationRefills: '1',
  //     medicationRefillExpirationInDays: '56',
  //   },
  //   {
  //     medicationId: 'b225a5dc-5d6e-4f49-b41c-3fbb3dc08f4d',
  //     medicationName: 'Spironolactone, 25 mg, 60 capsules',
  //     medicationInstructions: 'Morning, Evening',
  //     medicationSpecialInstructions: '',
  //     medicationRefills: '1',
  //     medicationRefillExpirationInDays: '42',
  //   },
  //   {
  //     medicationId: '9a9b7d2d-94ed-4c44-a37c-c1db7644b0a1',
  //     medicationName: 'Zilxi (Minocycline Topical Foam), 1.5%',
  //     medicationInstructions: 'Morning, Evening',
  //     medicationSpecialInstructions: 'Take one in the morning and one at night',
  //     medicationRefills: '1',
  //     medicationRefillExpirationInDays: '',
  //   },
  // ]

  const treatmentData = [
    {
      treatmentId: '9a9b7d2d-94ed-4c44-a37c-c1db7644b0a1',
      treatmentName: 'Mild Acne',
      treatmentGroups: [
        {
          treatmentMedicines: ['Benzoyl Peroxide, 10% Cleanser', 'Sulfur Cleanser (AVAR cleanser), 10/2', 'Sulfur Cleanser (AVAR cleanser), 10/5'],
        },
        {
          treatmentMedicines: [
            'Aczone, 7.5%, 60 grams',
            'Benzaclin, 1% clinda/5% BP',
            'Benzamycin gel, 3% erythromycin / 5% benzoyl peroxide , 46.6 g',
            'Clindamycin Gel, 1%, 20 grams',
            'Clindamycin Lotion, 1%',
            'Clindamycin Pledgets (swab), 1%',
            'Dapsone Gel, 5%',
            'Dapsone Gel, 7.5%',
            'Erythromycin pads, 2%',
            'Generic duac ( clindamycin 1.2% / benzoyl peroxide 5% ) gel, 30 grams',
          ],
        },
        {
          treatmentMedicines: [
            'Adapalene gel, 0.1, 45 g',
            'Adapalene gel, 0.3, 45 g',
            'Aklief Cream, .005%, 45g',
            'Epiduo forte gel, 0.3%/2.5%',
            'Epiduo gel, 0.1%/2.5%',
            'Metrocream, 0.75%, 45g',
            'Retin-A Micro, .04, 20g',
            'Retin-A Micro, 0.06%',
            'Retin-A Micro, 0.08%',
            'Retin-A Micro, 0.1%',
            'Tazarotene Cream, 0.1%, 30 g',
            'Tazorac Cream, 0.05%, 30 grams',
            'Tazorac Cream, 0.1%, 30 grams',
            'Tretinoin cream, 0.025%, 20 g',
            'Tretinoin cream, 0.025%, 45 g',
            'Tretinoin cream, 0.05%, 20 g',
            'Tretinoin, .1%, 20g',
            'Tretinoin, .1%, 45g',
          ],
        },
        { treatmentMedicines: ['Moisturizer'] },
      ],
    },
    {
      treatmentId: '654c3e76-3bc1-4ca2-8e81-835c448e5bb5',
      treatmentName: 'Onychomycosis',
      treatmentGroups: [
        {
          treatmentMedicines: ['Jublia, 10%, 4ml', 'Jublia, 10%, 8ml', 'Tavaborole, 5%, 10ml'],
        },
      ],
    },
    {
      treatmentId: '7ff6f56e-e12e-4f04-9e44-6db1d3bdcabc',
      treatmentName: 'Tinea Versicolor',
      treatmentGroups: [
        {
          treatmentMedicines: [
            'Ciclopirox shampoo, 1%, 120mL ',
            'Fluconazole, 150mg ',
            'Itraconazole, 100mg ',
            'Ketoconazole Cream, 2%, 60 grams ',
            'Ketoconazole shampoo, 2%',
          ],
        },
      ],
    },
  ]

  return { medicationData, treatmentData, getMedicationsFromGraphQL }
})
