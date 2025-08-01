import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

function CommonForm({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  isBtnDisabled,
  hideButton = false,
}) {
  function renderInputsByComponentType(getControlItem) {
    let element = null;
    const value = formData[getControlItem.name] || "";

    switch (getControlItem.componentType) {
      case "input":
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );

        break;
      case "select":
        element = (
          <Select
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [getControlItem.name]: value,
              })
            }
            value={value}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getControlItem.label} />
            </SelectTrigger>
            <SelectContent>
              {getControlItem.options && getControlItem.options.length > 0
                ? getControlItem.options.map((optionItem) => (
                    <SelectItem key={optionItem.id} value={optionItem.id}>
                      {optionItem.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );

        break;
      case "textarea":
        element = (
          <Textarea
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.id}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );

        break;

      default:
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
        break;
    }

    return element;
  }

  return (
    <>
      {hideButton ? (
        // When hideButton is true, don't wrap in form (parent handles it)
        <div className="space-y-6">
          {formControls.map((controlItem) => (
            <div className="space-y-2" key={controlItem.name}>
              <Label className="text-sm font-semibold text-brown-800 tracking-normal">
                {controlItem.label}
              </Label>
              <div className="relative">
                {renderInputsByComponentType(controlItem)}
              </div>
            </div>
          ))}
        </div>
      ) : (
        // When hideButton is false, wrap in form with button
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-6">
            {formControls.map((controlItem) => (
              <div className="space-y-2" key={controlItem.name}>
                <Label className="text-sm font-semibold text-brown-800 tracking-normal">
                  {controlItem.label}
                </Label>
                <div className="relative">
                  {renderInputsByComponentType(controlItem)}
                </div>
              </div>
            ))}
          </div>
          <div className="pt-4">
            <Button 
              disabled={isBtnDisabled} 
              type="submit" 
              className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-md hover:shadow-lg"
            >
              {buttonText || "Submit"}
            </Button>
          </div>
        </form>
      )}
    </>
  );
}

export default CommonForm;
