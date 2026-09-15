import { useState } from "react";
import { PackageParameterType } from "../../models/activity-package.model";

function PackageConfigurationForm({packageDefinition, initialValues = {}, onInstall, onCancel}) {
	const [values, setValues] = useState(() => packageDefinition.parameters.reduce((result, parameter) => ({...result, [parameter.id]: initialValues[parameter.id] ?? parameter.defaultValue ?? ""}), {}));
	const [errors, setErrors] = useState([]);

	const submit = event => {
		event.preventDefault();
		const result = onInstall(values);
		setErrors(result?.errors || []);
	};

	return <form className="package-configuration" onSubmit={submit} noValidate>
		<h4>Configure {packageDefinition.name}</h4>
		{packageDefinition.parameters.map(parameter => {
			const descriptionId = `${packageDefinition.id}-${parameter.id}-description`;
			const inputId = `${packageDefinition.id}-${parameter.id}`;
			return <div className="package-configuration__field" key={parameter.id}>
				<label htmlFor={inputId}>{parameter.label}</label>
				{parameter.description && <p id={descriptionId} className="muted">{parameter.description}</p>}
				{parameter.type === PackageParameterType.INTEGER && <input id={inputId} type="number" inputMode="numeric" min={parameter.min} max={parameter.max} step={parameter.step || 1} required={parameter.required} aria-describedby={parameter.description ? descriptionId : undefined} value={values[parameter.id]} onChange={event => setValues(currentValues => ({...currentValues, [parameter.id]: event.target.value === "" ? "" : Number(event.target.value)}))} />}
			</div>;
		})}
		{errors.length > 0 && <p className="package-configuration__error" role="alert">Choose a whole number within the allowed range.</p>}
		<div className="package-configuration__actions">
			<button className="game-button" type="submit">Install package</button>
			<button className="game-button game-button--secondary" type="button" onClick={onCancel}>Cancel</button>
		</div>
	</form>;
}

export default PackageConfigurationForm;