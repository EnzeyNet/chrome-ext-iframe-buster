
class SimpleSet {
	#items = []

	has(item) {
		const index = this.#items.indexOf(item)
		return index !== -1
	}
	add(item) {
		this.#items.push(item)
		this.#items = this.#items
	}
	remove(item) {
		const index = this.#items.indexOf(item)
		this.#items.splice(index, 1)
		this.#items = this.#items
	}
	toggle(item) {
		const index = this.#items.indexOf(item)
		if (index === -1) {
			this.#items.splice(index, 1)
		} else {
			this.#items.push(item)
		}
		this.#items = this.#items
	}
}


export default SimpleSet
