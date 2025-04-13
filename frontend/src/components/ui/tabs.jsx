import * as React from "react";

// Basic TabsList component 
const TabsList = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div 
      ref={ref}
      className={`flex items-center justify-center rounded-md p-1 ${className || ''}`}
      role="tablist"
      {...props}
    />
  );
});
TabsList.displayName = "TabsList";

// TabsTrigger component for tab headers
const TabsTrigger = React.forwardRef(({ className, value, active, ...props }, ref) => {
  const [isSelected, setIsSelected] = React.useState(false);
  const context = React.useContext(TabsContext);

  React.useEffect(() => {
    setIsSelected(context?.value === value);
  }, [context?.value, value]);

  return (
    <button 
      ref={ref}
      role="tab" 
      aria-selected={isSelected}
      data-state={isSelected ? "active" : "inactive"}
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 ${isSelected ? "bg-white shadow-sm" : "text-muted-foreground hover:bg-muted hover:text-muted-foreground"} ${className || ''}`}
      onClick={() => context?.onValueChange(value)}
      {...props}
    />
  );
});
TabsTrigger.displayName = "TabsTrigger";

// TabsContent component for content panels
const TabsContent = React.forwardRef(({ className, value, ...props }, ref) => {
  const context = React.useContext(TabsContext);
  const isSelected = context?.value === value;

  if (!isSelected && !context?.unmountOnExit) {
    return null;
  }

  return (
    <div
      ref={ref}
      role="tabpanel"
      aria-labelledby={`tabs-trigger-${value}`}
      hidden={!isSelected}
      data-state={isSelected ? "active" : "inactive"}
      className={className}
      tabIndex={isSelected ? 0 : -1}
      {...props}
    />
  );
});
TabsContent.displayName = "TabsContent";

// Create context for state management
const TabsContext = React.createContext(null);

// Main Tabs component
function Tabs({ defaultValue, value, onValueChange, unmountOnExit = true, children, ...props }) {
  const [tabValue, setTabValue] = React.useState(value || defaultValue || "");
  
  React.useEffect(() => {
    if (value !== undefined) {
      setTabValue(value);
    }
  }, [value]);

  const handleValueChange = React.useCallback((newValue) => {
    setTabValue(newValue);
    onValueChange?.(newValue);
  }, [onValueChange]);

  return (
    <TabsContext.Provider value={{ value: tabValue, onValueChange: handleValueChange, unmountOnExit }}>
      <div {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };