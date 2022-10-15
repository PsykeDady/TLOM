
const CURRENCY_TYPES=[
	"Real Currency", /* reflects real currencies */
	"Virtual", /* in-game currency, useful for virtual rewards */
	"SkillBased" /* CUSTOM currency, based on skill, unlock some rewards need specific */
]

class CurrencyModel {
	currentyType = CURRENCY_TYPES[0]
	qta = 0 
}

export default CurrencyModel