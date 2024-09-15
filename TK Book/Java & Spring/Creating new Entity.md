# Repository, Manager, and Test

When working with an older Spring project that doesn't use the annotation-based configuration typical in Spring Boot, you would need to configure your DAO, Entity, and Service in XML files.

```xml
<beans>
 
    <!-- Copy From Here-->
    <bean id="!name!" parent="abstractDao">
        <property name="proxyInterfaces">
            <value>!packageName.DaoClassName!</value>
        </property>
        <property name="target">
            <bean parent="abstractDaoTarget">
                <constructor-arg>
                    <value>!packageName.EntityName!</value>
                </constructor-arg>
            </bean>
        </property>
    </bean>
    <!-- Till Here -->
</beans>
```

**id attribute:** This attribute provides a unique identifier for the bean within the Spring application context. In this case, the bean is identified as `contexteDao`. Other parts of the application can refer to this bean by its id.

**parent attribute:** This attribute specifies the parent bean from which the current bean inherits configuration. In this example, `contexteDao` inherits configurations from a bean named `abstractDao`.

**property element (proxyInterfaces):** The property element is used to set a property on the bean. In this case, it sets the `proxyInterfaces` property to the specified value. This property is likely used by Spring to create a proxy for the DAO interface. The value is the fully qualified class name of the interface implemented by the DAO, which is `fr.aphp.tumorotek.dao.contexte.ContexteDao`.

**property element (target):** Similar to the previous property, this sets the `target` property. The target property usually specifies the actual object to which method calls on the proxy will be delegated. In this example, it points to another bean (`abstractDaoTarget`) which is presumably responsible for creating instances of the target class (`fr.aphp.tumorotek.model.contexte.Contexte`).

**bean element (abstractDaoTarget):** This defines another bean named `abstractDaoTarget`. The parent attribute is likely used to inherit configurations from a common parent, and the constructor-arg element sets...

## Injecting DAO into Service

When you want to use a DAO inside a service (manager), you typically inject the DAO as a dependency into the service bean.

```xml
<beans>

    <!-- Configure UserService bean -->
    <bean id="userService" class="com.example.service.UserService">
        <property name="userDao" ref="userDao" />
    </bean>

</beans>
```

**bean element (userService):**
- **id attribute:** Unique identifier for the bean within...

## Writing Tests

Extend an AbstractDaoTest and create necessary methods for testing.

```java
public class ParametreDaoTest extends AbstractDaoTest {

   private ParametreDao parametreDao;

   public void setParametreDao(ParametreDao parametreDao) {
      this.parametreDao = parametreDao;
   }

   public void testFindByPlateformeIdAndCode() {
      Integer plateformID = 1;
      String code = "welcome.message";

      Parametre newParametre = new Parametre();
      newParametre.setPlateformeId(plateformID);
      newParametre.setCode(code);

      parametreD...
```

## Optional: Including Tests in pom.xml

You can include tests in your Maven build configuration using plugins like maven-surefire-plugin.

```xml
<!-- pom.xml -->
<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-surefire-plugin</artifactId>
            <version>3.0.0-M5</version>
            ...
        </plugin>
    </plugins>
</build>

```

These steps provide a basic structure for setting up DAOs, Services, and tests in an older Spring project using XML configuration. Adjust package names...